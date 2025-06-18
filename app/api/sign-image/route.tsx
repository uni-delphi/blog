import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { paramsToSign: Record<string, string> };
    const { paramsToSign } = body;

    
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    // If the signature is valid, proceed with your logic
    return Response.json({signature });
  } catch (error) {
    console.error('Error validating signature:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}