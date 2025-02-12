import { Client } from '@hubspot/api-client';
import type { HubSpotCompanyProperties, HubSpotContactProperties } from './transforms';

if (!process.env.HUBSPOT_ACCESS_TOKEN) {
  throw new Error('HUBSPOT_ACCESS_TOKEN is not defined');
}

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

/**
 * Creates or updates a company in HubSpot
 */
export async function createOrUpdateCompany(properties: HubSpotCompanyProperties) {
  try {
    // Add detailed logging at the very start
    console.log('🔍 Raw data entering HubSpot client:', {
      name: properties.name,
      number_of_locations: properties.number_of_locations,
      restaurant_type: properties.restaurant_type,
      pos_system: properties.pos_system,
      delivery_partners: properties.delivery_partners,
      interested_services: properties.interested_services,
      average_monthly_orders: properties.average_monthly_orders
    });

    // First search for existing company
    const searchResponse = await hubspotClient.crm.companies.searchApi.doSearch({
      filterGroups: [{
        filters: [{
          propertyName: 'name',
          operator: 'CONTAINS_TOKEN',
          value: properties.name
        }]
      }]
    });

    console.log('🔍 Search response:', searchResponse);

    // Convert properties to HubSpot format - REMOVE the second transformation
    const hubspotProperties = {
      ...properties,  // Use the already transformed data
      number_of_locations: String(properties.number_of_locations),
      website: '',
      industry: 'HOSPITALITY',
      type: 'PROSPECT'
    };

    // Debug transformed properties
    console.log('Final HubSpot properties:', hubspotProperties);

    // Log the final properties being sent to HubSpot
    console.log('Final properties being sent to HubSpot:', {
      properties: hubspotProperties
    });

    if (searchResponse.results.length > 0) {
      // Update existing company
      const companyId = searchResponse.results[0].id;
      console.log('Updating existing company:', companyId);
      
      const updateResponse = await hubspotClient.crm.companies.basicApi.update(companyId, {
        properties: hubspotProperties
      });
      console.log('Update response:', updateResponse);
      return companyId;
    } else {
      // Create new company
      console.log('Creating new company');
      const createResponse = await hubspotClient.crm.companies.basicApi.create({
        properties: hubspotProperties,
        associations: []
      });
      console.log('Create response:', createResponse);
      return createResponse.id;
    }
  } catch (error) {
    console.error('Error in createOrUpdateCompany:', error);
    throw error;
  }
}

/**
 * Creates associations between a contact and company in both directions
 */
async function createBidirectionalAssociation(contactId: string, companyId: string) {
  try {
    console.log('Creating associations between contact', contactId, 'and company', companyId);

    // Create association using the correct format
    await hubspotClient.apiRequest({
      method: 'PUT',
      path: `/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`,
      body: {
        types: [{
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: 1
        }]
      }
    });

    console.log('Successfully created association');
  } catch (error) {
    console.error('Error creating associations:', error);
    throw new Error('Failed to associate contact with company: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Creates a contact and associates it with a company
 */
export async function createContactWithCompany(
  properties: HubSpotContactProperties,
  companyId: string
) {
  try {
    console.log('Creating/updating contact with properties:', properties);

    // Search only by email first
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'EQ',
          value: properties.email
        }]
      }]
    });

    const contactProperties = {
      properties: {
        firstname: properties.firstname,
        lastname: properties.lastname,
        email: properties.email.toLowerCase(),
        phone: properties.phone.replace(/\D/g, ''),
        company: properties.restaurant, // Set company name to restaurant name
        notes: properties.notes || ''
      }
    };

    let contactId;
    
    // Check if we found a contact with matching email AND company
    const existingContact = searchResponse.results.find(
      contact => contact.properties.company === properties.restaurant
    );
    
    if (existingContact) {
      // Update existing contact
      contactId = existingContact.id;
      await hubspotClient.crm.contacts.basicApi.update(contactId, contactProperties);
    } else {
      // Create new contact
      const contact = await hubspotClient.crm.contacts.basicApi.create({
        ...contactProperties,
        associations: []
      });
      contactId = contact.id;
    }

    // Create bidirectional association with the restaurant company
    await createBidirectionalAssociation(contactId, companyId);

    return contactId;
  } catch (error) {
    console.error('Error creating/updating contact:', error);
    throw error;
  }
} 