const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;

interface ContactProperties {
  email: string;
  firstname: string;
  phone: string;
  company: string;
  restaurant_name: string;
  city?: string;
  state?: string;
  instagram_username?: string;
  social_platform?: string;
  social_link?: string;
  delivery_platforms?: string[];
  message?: string;
  lead_source?: string;
}

export async function createHubSpotContact(data: ContactProperties) {
  if (!HUBSPOT_API_KEY) {
    throw new Error('HUBSPOT_API_KEY is not configured');
  }

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstname,
          phone: data.phone,
          company: data.company,
          restaurant_name: data.restaurant_name || data.company,
          city: data.city || '',
          state: data.state || '',
          instagram_username: data.instagram_username || '',
          social_platform: data.social_platform?.toLowerCase() || '',
          social_link: data.social_link || '',
          delivery_platforms: Array.isArray(data.delivery_platforms) 
            ? data.delivery_platforms.join(';') 
            : '',
          message: data.message || '',
          lead_source: data.lead_source || 'Website Contact Form'
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create contact in HubSpot');
    }

    return await response.json();
  } catch (error) {
    console.error('HubSpot API Error:', error);
    throw error;
  }
} 