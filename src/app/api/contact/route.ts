import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createHubSpotContact } from '@/lib/hubspot';
import { z } from 'zod';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  restaurant: z.string().min(2),
  city: z.string().optional(),
  state: z.string().optional(),
  instagram: z.string().optional(),
  socialPlatform: z.string().optional(),
  socialLink: z.string().optional(),
  comments: z.string().optional(),
  deliveryPlatforms: z.array(z.string()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate the data
    const validatedData = contactSchema.parse(data);

    // Create contact in HubSpot
    await createHubSpotContact({
      email: validatedData.email,
      firstname: validatedData.name,
      phone: validatedData.phone,
      company: validatedData.restaurant,
      restaurant_name: validatedData.restaurant,
      city: validatedData.city,
      state: validatedData.state,
      instagram_username: validatedData.instagram,
      social_platform: validatedData.socialPlatform,
      social_link: validatedData.socialLink,
      delivery_platforms: validatedData.deliveryPlatforms,
      message: validatedData.comments,
      lead_source: 'Website Contact Form'
    });

    return NextResponse.json(
      { message: 'Contact created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
} 