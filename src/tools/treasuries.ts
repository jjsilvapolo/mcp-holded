import { HoldedClient } from '../holded-client.js';

export function getTreasuryTools(client: HoldedClient) {
  return {
    // List Treasuries Accounts
    list_treasuries: {
      description: 'List all treasury accounts',
      inputSchema: {
        type: 'object' as const,
        properties: {},
        required: [],
      },
      handler: async () => {
        return client.get('/treasury');
      },
    },

    // Create Treasury Account
    create_treasury: {
      description: 'Create a new treasury account',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Treasury account name',
          },
          iban: {
            type: 'string',
            description: 'IBAN number',
          },
          bic: {
            type: 'string',
            description: 'BIC/SWIFT code',
          },
          balance: {
            type: 'number',
            description: 'Initial balance',
          },
        },
        required: ['name'],
      },
      handler: async (args: Record<string, unknown>) => {
        return client.post('/treasury', args);
      },
    },

    // Get Treasury Account
    get_treasury: {
      description: 'Get a specific treasury account by ID',
      inputSchema: {
        type: 'object' as const,
        properties: {
          treasuryId: {
            type: 'string',
            description: 'Treasury account ID',
          },
        },
        required: ['treasuryId'],
      },
      handler: async (args: { treasuryId: string }) => {
        return client.get(`/treasury/${args.treasuryId}`);
      },
    },
  };
}
