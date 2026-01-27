import { HoldedClient } from '../holded-client.js';

export function getSalesChannelTools(client: HoldedClient) {
  return {
    // List Sales Channels
    list_sales_channels: {
      description: 'List all sales channels with pagination support',
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
        const channels = (await client.get('/saleschannels')) as Array<Record<string, unknown>>;
        const filtered = channels.map((channel) => ({
          id: channel.id,
          name: channel.name,
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

    // Create Sales Channel
    create_sales_channel: {
      description: 'Create a new sales channel',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Sales channel name',
          },
        },
        required: ['name'],
      },
      destructiveHint: true,
      handler: async (args: Record<string, unknown>) => {
        return client.post('/saleschannels', args);
      },
    },

    // Get Sales Channel
    get_sales_channel: {
      description: 'Get a specific sales channel by ID',
      inputSchema: {
        type: 'object' as const,
        properties: {
          channelId: {
            type: 'string',
            description: 'Sales channel ID',
          },
        },
        required: ['channelId'],
      },
      readOnlyHint: true,
      handler: async (args: { channelId: string }) => {
        return client.get(`/saleschannels/${args.channelId}`);
      },
    },

    // Update Sales Channel
    update_sales_channel: {
      description: 'Update an existing sales channel',
      inputSchema: {
        type: 'object' as const,
        properties: {
          channelId: {
            type: 'string',
            description: 'Sales channel ID to update',
          },
          name: {
            type: 'string',
            description: 'Sales channel name',
          },
        },
        required: ['channelId'],
      },
      destructiveHint: true,
      handler: async (args: { channelId: string; [key: string]: unknown }) => {
        const { channelId, ...body } = args;
        return client.put(`/saleschannels/${channelId}`, body);
      },
    },

    // Delete Sales Channel
    delete_sales_channel: {
      description: 'Delete a sales channel',
      inputSchema: {
        type: 'object' as const,
        properties: {
          channelId: {
            type: 'string',
            description: 'Sales channel ID to delete',
          },
        },
        required: ['channelId'],
      },
      destructiveHint: true,
      handler: async (args: { channelId: string }) => {
        return client.delete(`/saleschannels/${args.channelId}`);
      },
    },
  };
}
