import { HoldedClient } from '../holded-client.js';

export function getServiceTools(client: HoldedClient) {
  return {
    // List Services
    list_services: {
      description: 'List all services with optional pagination',
      inputSchema: {
        type: 'object' as const,
        properties: {
          page: {
            type: 'number',
            description: 'Page number for pagination (optional)',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of items to return (default: 50, max: 500)',
          },
          summary: {
            type: 'boolean',
            description: 'Return only count and pagination metadata without items (default: false)',
          },
        },
        required: [],
      },
      readOnlyHint: true,
      handler: async (args: { page?: number; limit?: number; summary?: boolean }) => {
        const queryParams: Record<string, string | number> = {};
        if (args.page) queryParams.page = args.page;
        if (args.limit) queryParams.limit = Math.min(args.limit, 500);
        const services = (await client.get('/services', queryParams)) as Array<
          Record<string, unknown>
        >;
        const limit = Math.min(args.limit ?? 50, 500);
        const filtered = services.map((service) => ({
          id: service.id,
          name: service.name,
          price: service.price,
          tax: service.tax,
        }));
        const items = filtered.slice(0, limit);

        // Summary mode: return only count and metadata
        if (args.summary) {
          return {
            count: items.length,
            hasMore: items.length === limit && filtered.length > limit,
          };
        }

        return {
          items,
          page: args.page,
          pageSize: items.length,
          hasMore: items.length === limit && filtered.length > limit,
        };
      },
    },

    // Create Service
    create_service: {
      description: 'Create a new service',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Service name',
          },
          sku: {
            type: 'string',
            description: 'Service SKU',
          },
          price: {
            type: 'number',
            description: 'Service price',
          },
          tax: {
            type: 'number',
            description: 'Tax percentage',
          },
          description: {
            type: 'string',
            description: 'Service description',
          },
        },
        required: ['name'],
      },
      destructiveHint: true,
      handler: async (args: Record<string, unknown>) => {
        return client.post('/services', args);
      },
    },

    // Get Service
    get_service: {
      description: 'Get a specific service by ID',
      inputSchema: {
        type: 'object' as const,
        properties: {
          serviceId: {
            type: 'string',
            description: 'Service ID',
          },
        },
        required: ['serviceId'],
      },
      readOnlyHint: true,
      handler: async (args: { serviceId: string }) => {
        return client.get(`/services/${args.serviceId}`);
      },
    },

    // Update Service
    update_service: {
      description: 'Update an existing service',
      inputSchema: {
        type: 'object' as const,
        properties: {
          serviceId: {
            type: 'string',
            description: 'Service ID to update',
          },
          name: {
            type: 'string',
            description: 'Service name',
          },
          sku: {
            type: 'string',
            description: 'Service SKU',
          },
          price: {
            type: 'number',
            description: 'Service price',
          },
          tax: {
            type: 'number',
            description: 'Tax percentage',
          },
          description: {
            type: 'string',
            description: 'Service description',
          },
        },
        required: ['serviceId'],
      },
      destructiveHint: true,
      handler: async (args: { serviceId: string; [key: string]: unknown }) => {
        const { serviceId, ...body } = args;
        return client.put(`/services/${serviceId}`, body);
      },
    },

    // Delete Service
    delete_service: {
      description: 'Delete a service',
      inputSchema: {
        type: 'object' as const,
        properties: {
          serviceId: {
            type: 'string',
            description: 'Service ID to delete',
          },
        },
        required: ['serviceId'],
      },
      destructiveHint: true,
      handler: async (args: { serviceId: string }) => {
        return client.delete(`/services/${args.serviceId}`);
      },
    },
  };
}
