import { HoldedClient } from '../holded-client.js';

export function getRemittanceTools(client: HoldedClient) {
  return {
    // List Remittances
    list_remittances: {
      description: 'List all remittances with pagination support',
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
        const remittances = (await client.get('/remittances')) as Array<Record<string, unknown>>;
        const filtered = remittances.map((remittance) => ({
          id: remittance.id,
          name: remittance.name,
          date: remittance.date,
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

    // Get Remittance
    get_remittance: {
      description: 'Get a specific remittance by ID',
      inputSchema: {
        type: 'object' as const,
        properties: {
          remittanceId: {
            type: 'string',
            description: 'Remittance ID',
          },
        },
        required: ['remittanceId'],
      },
      readOnlyHint: true,
      handler: async (args: { remittanceId: string }) => {
        return client.get(`/remittances/${args.remittanceId}`);
      },
    },
  };
}
