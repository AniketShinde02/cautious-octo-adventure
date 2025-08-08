import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;

    const response = await imagekit.upload({
      file: buffer,
      fileName: uniqueFileName,
      folder: '/captioncraft_uploads/',
    });

    return NextResponse.json({ success: true, url: response.url }, { status: 200 });
  } catch (error: any) {
    console.error('ImageKit Upload Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
