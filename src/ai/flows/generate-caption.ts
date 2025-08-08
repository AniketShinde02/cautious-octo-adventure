
'use server';

/**
 * @fileOverview Generates multiple captions for a social media post based on a user-provided description and mood.
 *
 * - generateCaptions - A function that generates captions.
 * - GenerateCaptionsInput - The input type for the generateCaptions function.
 * - GenerateCaptionsOutput - The return type for the generateCaptionsOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import dbConnect from '@/lib/db';
import { Types } from 'mongoose';
import { clientPromise } from '@/lib/db';

const GenerateCaptionsInputSchema = z.object({
  mood: z.string().describe('The selected mood for the caption.'),
  description: z
    .string()
    .optional()
    .describe(
      'A description of the photo or video for which to generate captions.'
    ),
  imageUrl: z.string().optional().describe('The URL of the uploaded image.'),
  userId: z.string().optional().describe("The ID of the user generating the captions."),
});
export type GenerateCaptionsInput = z.infer<typeof GenerateCaptionsInputSchema>;

const GenerateCaptionsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of 3 generated captions for the social media post.'),
});
export type GenerateCaptionsOutput = z.infer<typeof GenerateCaptionsOutputSchema>;

export async function generateCaptions(input: GenerateCaptionsInput): Promise<GenerateCaptionsOutput> {
  return generateCaptionsFlow(input);
}

const generateCaptionsPrompt = ai.definePrompt({
  name: 'generateCaptionsPrompt',
  input: {schema: GenerateCaptionsInputSchema},
  output: {schema: GenerateCaptionsOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging captions for a Gen Z audience.

  Generate exactly 3 unique captions for a social media post based on the following mood.
  
  Mood: {{{mood}}}

  {{#if description}}
  Use this optional description for additional context: {{{description}}}
  {{/if}}

  Each caption should be unique and suitable for platforms like TikTok, Instagram, and Snapchat.
  Incorporate relevant emojis and hashtags.
  Return the captions in an array.
  `,
});

const generateCaptionsFlow = ai.defineFlow(
  {
    name: 'generateCaptionsFlow',
    inputSchema: GenerateCaptionsInputSchema,
    outputSchema: GenerateCaptionsOutputSchema,
  },
  async input => {
    // First, generate the captions with the AI
    const {output} = await generateCaptionsPrompt(input);

    if (output && output.captions) {
        try {
            await dbConnect();
            const client = await clientPromise;
            const db = client.db();
            const postsCollection = db.collection('posts');
            
            console.log('Attempting to save posts to database...');
            
            const postsToInsert = output.captions.map(caption => ({
              caption: caption,
              image: input.imageUrl,
              createdAt: new Date(),
              ...(input.userId && { user: new Types.ObjectId(input.userId) }),
            }));
            
            const result = await postsCollection.insertMany(postsToInsert);

            if (result.insertedCount !== 3) {
                 throw new Error(`Expected to insert 3 posts, but only inserted ${result.insertedCount}.`);
            }

            console.log('All posts saved successfully.');
        } catch (error) {
            console.error('CRITICAL: Failed to save posts to database', error);
            // Re-throw the error to be caught by the client-side fetch.
            // This ensures the user is notified of the failure.
            throw new Error('Failed to save captions to the database.');
        }
    }
    
    return output!;
  }
);
