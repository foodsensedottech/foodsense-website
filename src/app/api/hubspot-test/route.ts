import { NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

if (!process.env.HUBSPOT_ACCESS_TOKEN) {
  throw new Error('HUBSPOT_ACCESS_TOKEN is not defined');
}

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export async function POST() {
  try {
    // Test data with both formats
    const testProperties = {
      properties: {
        name: 'Test Restaurant API',
        number_of_locations: '1',
        delivery_partners: 'ubereats;doordash', // Correct format for multi-select
        // Test both formats for interested_services
        interested_services: 'Menu Analysis & Optimization; Cost Management', // Try semicolon
        // interested_services: 'Menu Analysis & Optimization, Cost Management', // Try comma
        restaurant_type: 'food_truck',
        industry: 'HOSPITALITY',
        type: 'PROSPECT'
      },
      associations: []
    };

    console.log('Sending test data to HubSpot:', testProperties);

    const response = await hubspotClient.crm.companies.basicApi.create(testProperties);
    
    console.log('HubSpot response:', response);

    return NextResponse.json({ 
      success: true,
      response,
      sentData: testProperties
    });

  } catch (error) {
    console.error('Test API Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      data: error
    });
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 