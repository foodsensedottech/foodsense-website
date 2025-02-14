import { NextResponse } from 'next/server';
import { createOrUpdateCompany, createContactWithCompany } from '@/lib/hubspot/client';
import { contactFormSchema } from '@/lib/validation/contact-schema';
import { transformCompanyProperties, transformContactProperties } from '@/lib/hubspot/transforms';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log raw form data as soon as we receive it
    console.log('Received form data:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      restaurant: data.restaurant,
      numberOfLocations: data.numberOfLocations,
      monthlyOrders: data.monthlyOrders,
      restaurantType: data.restaurantType,
      serviceInterests: data.serviceInterests, // Should show ID:Title pairs
      deliveryPartners: data.deliveryPartners,
      posSystem: data.posSystem,
      notes: data.notes
    });

    // Validate the data
    const validatedData = contactFormSchema.parse(data);
    console.log('Validated data:', validatedData);

    // Transform and send to HubSpot
    const companyProperties = transformCompanyProperties(validatedData);
    const contactProperties = transformContactProperties(validatedData);

    console.log('Transformed company properties:', companyProperties);
    console.log('Transformed contact properties:', contactProperties);

    // Create or update company first
    const companyId = await createOrUpdateCompany(companyProperties);
    console.log('Created/Updated company with ID:', companyId);

    // Create contact and associate with company
    const contactId = await createContactWithCompany(contactProperties, companyId);
    console.log('Created contact with ID:', contactId);

    return NextResponse.json({ 
      success: true, 
      contactId,
      companyId
    });

  } catch (error) {
    // Detailed error logging
    console.error('Contact form submission error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      data: error
    });

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to submit form' 
      },
      { status: 500 }
    );
  }
} 