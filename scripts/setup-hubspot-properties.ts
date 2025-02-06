import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

if (!HUBSPOT_API_KEY) {
  throw new Error('HUBSPOT_API_KEY is not configured in .env.local');
}

interface HubSpotProperty {
  name: string;
  label: string;
  type: 'string' | 'enumeration';
  fieldType: 'text' | 'select' | 'checkbox';
  groupName: string;
  options?: Array<{ label: string; value: string }>;
  defaultValue?: string;
}

const groups = [
  {
    name: 'social',
    displayName: 'Social Media',
    displayOrder: 2
  },
  {
    name: 'restaurant_info',
    displayName: 'Restaurant Information',
    displayOrder: 3
  },
  {
    name: 'marketing',
    displayName: 'Marketing',
    displayOrder: 4
  }
];

const properties: HubSpotProperty[] = [
  {
    name: 'restaurant_name',
    label: 'Restaurant Name',
    type: 'string' as const,
    fieldType: 'text' as const,
    groupName: 'contactinformation'
  },
  {
    name: 'instagram_username',
    label: 'Instagram Username',
    type: 'string' as const,
    fieldType: 'text' as const,
    groupName: 'social'
  },
  {
    name: 'social_platform',
    label: 'Social Platform',
    type: 'enumeration' as const,
    fieldType: 'select' as const,
    groupName: 'social',
    options: [
      { label: 'Facebook', value: 'facebook' },
      { label: 'Twitter', value: 'twitter' },
      { label: 'LinkedIn', value: 'linkedin' },
      { label: 'TikTok', value: 'tiktok' },
      { label: 'YouTube', value: 'youtube' },
      { label: 'Other', value: 'other' }
    ]
  },
  {
    name: 'social_link',
    label: 'Social Profile Link',
    type: 'string',
    fieldType: 'text',
    groupName: 'social'
  },
  {
    name: 'delivery_platforms',
    label: 'Delivery Platforms',
    type: 'enumeration',
    fieldType: 'checkbox',
    groupName: 'restaurant_info',
    options: [
      { label: 'UberEats', value: 'ubereats' },
      { label: 'DoorDash', value: 'doordash' },
      { label: 'Grubhub', value: 'grubhub' },
      { label: 'ezCater', value: 'ezcater' },
      { label: 'Other', value: 'other' }
    ]
  },
  {
    name: 'lead_source',
    label: 'Lead Source',
    type: 'string',
    fieldType: 'text',
    groupName: 'marketing',
    defaultValue: 'Website Contact Form'
  }
];

async function createPropertyGroup(group: typeof groups[0]) {
  try {
    const response = await fetch('https://api.hubapi.com/properties/v1/contacts/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`
      },
      body: JSON.stringify(group)
    });

    if (!response.ok) {
      const error = await response.json() as { message: string };
      throw new Error(`Failed to create group ${group.name}: ${error.message}`);
    }

    console.log(`✓ Created property group: ${group.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`✗ Error creating group ${group.name}:`, error.message);
    }
  }
}

async function createProperty(property: HubSpotProperty) {
  try {
    const response = await fetch('https://api.hubapi.com/properties/v1/contacts/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`
      },
      body: JSON.stringify(property)
    });

    if (!response.ok) {
      const error = await response.json() as { message: string };
      throw new Error(`Failed to create property ${property.name}: ${error.message}`);
    }

    console.log(`✓ Created property: ${property.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`✗ Error creating property ${property.name}:`, error.message);
    } else {
      console.error(`✗ Error creating property ${property.name}:`, String(error));
    }
  }
}

async function setupProperties() {
  console.log('Setting up HubSpot properties...');
  
  // Create groups first
  for (const group of groups) {
    await createPropertyGroup(group);
  }
  
  // Then create properties
  for (const property of properties) {
    await createProperty(property);
  }
  
  console.log('Setup complete!');
}

setupProperties().catch(console.error); 