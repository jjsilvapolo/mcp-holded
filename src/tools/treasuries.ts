import { HoldedClient } from '../holded-client.js';

export function getTreasuryTools(client: HoldedClient) {
  return {
    // List Treasuries Accounts
    list_treasuries: {
      description: 'List all treasury accounts with pagination support',
      inputSchema: {
        type: 'object' as const,
        properties: {
          page: {
            type: 'number',
            description: 'Page number (starting from 1, default: 1)',
          },
          pageSize: {
            type: 'number',
            description: 'Number of items per page (default: 50, max: 500)',
          },
          summary: {
            type: 'boolean',
            description: 'Return only total count and page count without items (default: false)',
          },
        },
        required: [],
      },
      readOnlyHint: true,
      handler: async (args: { page?: number; pageSize?: number; summary?: boolean }) => {
        const treasuries = (await client.get('/treasury')) as Array<Record<string, unknown>>;
        const filtered = treasuries.map((treasury) => ({
          id: treasury.id,
          name: treasury.name,
          balance: treasury.balance,
        }));

        // Pagination
        const page = Math.max(args.page ?? 1, 1);
        const pageSize = Math.min(args.pageSize ?? 50, 500);
        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = filtered.slice(startIndex, endIndex);

        // Summary mode: return only metadata
        if (args.summary) {
          return {
            total,
            totalPages,
          };
        }

        return {
          items,
          page,
          pageSize,
          total,
          totalPages,
        };
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
      destructiveHint: true,
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
      readOnlyHint: true,
      handler: async (args: { treasuryId: string }) => {
        return client.get(`/treasury/${args.treasuryId}`);
      },
    },
  };
}
