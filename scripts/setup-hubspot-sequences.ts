import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

if (!HUBSPOT_API_KEY) {
  throw new Error('HUBSPOT_API_KEY is not configured in .env.local');
}

const sequences = [
  {
    name: 'New Website Lead Sequence',
    enabled: true,
    steps: [
      {
        type: 'EMAIL',
        templateId: null, // Will be set after email template creation
        name: 'Welcome Email'
      },
      {
        type: 'DELAY',
        duration: '2_DAYS'
      },
      {
        type: 'TASK',
        title: 'Follow up with new restaurant lead',
        description: 'Review restaurant details and schedule initial consultation'
      }
    ],
    enrollmentCriteria: {
      filters: [
        {
          propertyName: 'lead_source',
          operator: 'EQ',
          value: 'Website Contact Form'
        }
      ]
    }
  }
];

async function createSequence(sequence: typeof sequences[0]) {
  try {
    const response = await fetch('https://api.hubapi.com/automation/v3/sequences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`
      },
      body: JSON.stringify(sequence)
    });

    if (!response.ok) {
      const error = await response.json() as { message: string };
      throw new Error(`Failed to create sequence ${sequence.name}: ${error.message}`);
    }

    console.log(`✓ Created sequence: ${sequence.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`✗ Error creating sequence ${sequence.name}:`, error.message);
    }
  }
}

async function setupSequences() {
  console.log('Setting up HubSpot sequences...');
  
  for (const sequence of sequences) {
    await createSequence(sequence);
  }
  
  console.log('Sequence setup complete!');
}

setupSequences().catch(console.error); 