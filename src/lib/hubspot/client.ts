import { Client } from "@hubspot/api-client";
import type {
  ExtendedHubSpotClient,
  HubSpotCompanyProperties,
  HubSpotContactProperties,
} from "./types";
import type {
  ClientOptions,
  CompanyProperties,
  ContactProperties,
  Client as HubSpotClient,
} from "@/lib/hubspot/types";

// Create a singleton instance
let clientInstance: ExtendedHubSpotClient | null = null;

export function getHubspotClient(): ExtendedHubSpotClient {
  if (!clientInstance) {
    const accessToken =
      typeof window === "undefined"
        ? process.env.HUBSPOT_ACCESS_TOKEN
        : process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error("HubSpot access token is not defined");
    }

    clientInstance = new Client({
      accessToken,
    }) as unknown as ExtendedHubSpotClient;
  }
  return clientInstance;
}

export const hubspotClient = getHubspotClient();

/**
 * Creates or updates a company in HubSpot
 */
export async function createOrUpdateCompany(
  properties: HubSpotCompanyProperties
): Promise<string> {
  const hubspotClient = getHubspotClient();
  let companyId: string;

  try {
    // Search for existing company
    const searchResponse = await hubspotClient.crm.companies.searchApi.doSearch(
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: "name",
                operator: "EQ",
                value: properties.name,
              },
            ],
          },
        ],
      }
    );

    if (searchResponse.results.length > 0) {
      companyId = searchResponse.results[0].id;
      console.log(`Updating existing company with ID: ${companyId}`);

      // Update company without owner
      await hubspotClient.crm.companies.basicApi.update(companyId, {
        properties,
      });
    } else {
      console.log("Creating new company");

      // Create company without owner
      const response = await hubspotClient.crm.companies.basicApi.create({
        properties,
      });
      companyId = response.id;
    }

    return companyId;
  } catch (error) {
    console.error("Error in createOrUpdateCompany:", error);
    throw error;
  }
}

/**
 * Creates or updates a contact and associates it with a company
 */
export async function createContactWithCompany(
  properties: HubSpotContactProperties,
  companyId: string
): Promise<string> {
  const hubspotClient = getHubspotClient();
  let contactId: string;

  try {
    // First search for existing contact by email
    const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: properties.email,
            },
          ],
        },
      ],
    });

    if (searchResponse.results.length > 0) {
      // Contact exists - update their properties
      contactId = searchResponse.results[0].id;
      console.log(`Updating existing contact with ID: ${contactId}`);

      await hubspotClient.crm.contacts.basicApi.update(contactId, {
        properties,
      });
    } else {
      // Create new contact
      console.log("Creating new contact");
      const response = await hubspotClient.crm.contacts.basicApi.create({
        properties,
      });
      contactId = response.id;
    }

    // Create association with the new company
    await hubspotClient.apiRequest({
      method: "PUT",
      path: `/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`,
      body: {
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: 1,
          },
        ],
      },
    });

    return contactId;
  } catch (error) {
    console.error("Error in createContactWithCompany:", error);
    throw error;
  }
}
