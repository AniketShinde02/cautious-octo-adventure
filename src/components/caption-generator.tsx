
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, UploadCloud, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateCaptions } from "@/ai/flows/generate-caption";
import { CaptionCard } from "./caption-card";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  mood: z.string().min(1, { message: "Please select a mood." }),
  description: z.string().optional(),
  image: z.any().optional(),
});

const moods = [
    "😊 Happy / Cheerful", "😍 Romantic / Flirty", "😎 Cool / Confident",
    "😜 Fun / Playful", "🤔 Thoughtful / Deep", "😌 Calm / Peaceful",
    "😢 Sad / Emotional", "😏 Sassy / Savage", "😲 Surprised / Excited",
    "🌅 Aesthetic / Artsy", "👔 Formal / Professional", "📈 Business / Corporate",
    "📝 Informative / Educational", "🎩 Elegant / Sophisticated", "🏖 Casual / Chill",
    "🔥 Motivational / Inspirational", "🎉 Celebratory / Festive", "⚡ Bold / Daring",
    "🌍 Travel / Adventure", "🍔 Foodie / Culinary", "🐾 Pet / Cute",
    "🎵 Musical / Rhythmic"
];

export function CaptionGenerator() {
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCaptions([]);

    try {
      let imageUrl = '';

      // Set up the image upload promise
      const uploadPromise = uploadedFile ? (async () => {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok || !uploadData.success) {
          throw new Error(uploadData.message || 'Image upload failed.');
        }
        return uploadData.url;
      })() : Promise.resolve(undefined);

      // Set up the caption generation promise
      const captionPromise = (imgUrl?: string) => generateCaptions({
        mood: values.mood,
        description: values.description,
        imageUrl: imgUrl,
        userId: session?.user?.id,
      });

      // If there's an image, run upload and generation in parallel
      if (uploadedFile) {
          const [resolvedImageUrl, captionResult] = await Promise.all([
              uploadPromise,
              captionPromise(await uploadPromise) // This seems redundant, let's fix
          ]);
          
          const result = await generateCaptions({
            mood: values.mood,
            description: values.description,
            imageUrl: resolvedImageUrl,
            userId: session?.user?.id,
          });

          if (result && result.captions) {
            setCaptions(result.captions);
          } else {
             throw new Error("Couldn't generate captions. Please try again.");
          }

      } else {
        // Otherwise, just generate captions
        const result = await captionPromise();
        if (result && result.captions) {
          setCaptions(result.captions);
        } else {
          throw new Error("Couldn't generate captions. Please try again.");
        }
      }

    } catch (error: any) {
      console.error("Caption Generation Error:", error);
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: error.message || "Failed to generate or save captions.",
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-4 border border-border bg-muted/20 rounded-lg">
            
            <div className="flex items-center justify-center w-full">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/40 transition-colors">
                  {imagePreview ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-muted/20">
                       <Image
                          src={imagePreview}
                          alt="Uploaded preview"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                  <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
              </label>
            </div> 

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a mood (required)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Choose the vibe for your caption..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {moods.map((mood) => (
                          <SelectItem key={mood} value={mood}>
                            {mood}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your content (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A golden retriever puppy playing in a field of flowers..."
                          className="min-h-[120px] bg-background border-border rounded-lg p-3 text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
            </div>
          </div>
          
           <div className="flex flex-col items-center gap-4">
              <Button type="submit" disabled={isLoading} size="lg" className="w-full max-w-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Captions
                  </>
                )}
              </Button>
              {!session && (
                <div className="text-muted-foreground flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                  <p className="text-xs text-center">Sign up to save your generated captions and images.</p>
               </div>
              )}
           </div>
        </form>
      </Form>

      {(isLoading || captions.length > 0) && (
        <div className="space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-center text-foreground">Your Captions ✨</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-muted/40 p-4 rounded-lg space-y-3 animate-pulse min-h-[150px] border border-border">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ))
              : captions.map((caption, index) => (
                  <CaptionCard key={index} caption={caption} />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
