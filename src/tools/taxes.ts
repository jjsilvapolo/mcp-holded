import { HoldedClient } from '../holded-client.js';

export function getTaxTools(client: HoldedClient) {
  return {
    // Get Taxes
    get_taxes: {
      description: 'Get all available taxes with pagination support',
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
        const taxes = (await client.get('/taxes')) as Array<Record<string, unknown>>;
        const filtered = taxes.map((tax) => ({
          id: tax.id,
          name: tax.name,
          percentage: tax.percentage,
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
  };
}
