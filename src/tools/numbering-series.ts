import { HoldedClient } from '../holded-client.js';

export function getNumberingSeriesTools(client: HoldedClient) {
  return {
    // Get Numbering Series by Type
    get_numbering_series: {
      description: 'Get numbering series for a specific document type with pagination support',
      inputSchema: {
        type: 'object' as const,
        properties: {
          docType: {
            type: 'string',
            enum: [
              'invoice',
              'salesreceipt',
              'creditnote',
              'receiptnote',
              'estimate',
              'salesorder',
              'waybill',
              'proform',
              'purchase',
              'purchaserefund',
              'purchaseorder',
            ],
            description: 'Document type',
          },
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
        required: ['docType'],
      },
      readOnlyHint: true,
      handler: async (args: {
        docType: string;
        page?: number;
        pageSize?: number;
        summary?: boolean;
      }) => {
        const series = (await client.get(`/numberseries/${args.docType}`)) as Array<
          Record<string, unknown>
        >;
        const filtered = series.map((serie) => ({
          id: serie.id,
          name: serie.name,
          prefix: serie.prefix,
          nextNumber: serie.nextNumber,
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

    // Create Numbering Serie
    create_numbering_serie: {
      description: 'Create a new numbering serie',
      inputSchema: {
        type: 'object' as const,
        properties: {
          docType: {
            type: 'string',
            enum: [
              'invoice',
              'salesreceipt',
              'creditnote',
              'receiptnote',
              'estimate',
              'salesorder',
              'waybill',
              'proform',
              'purchase',
              'purchaserefund',
              'purchaseorder',
            ],
            description: 'Document type',
          },
          name: {
            type: 'string',
            description: 'Serie name',
          },
          prefix: {
            type: 'string',
            description: 'Serie prefix',
          },
          nextNumber: {
            type: 'number',
            description: 'Next number in the serie',
          },
        },
        required: ['docType', 'name'],
      },
      destructiveHint: true,
      handler: async (args: { docType: string; [key: string]: unknown }) => {
        const { docType, ...body } = args;
        return client.post(`/numberseries/${docType}`, body);
      },
    },

    // Update Numbering Serie
    update_numbering_serie: {
      description: 'Update an existing numbering serie',
      inputSchema: {
        type: 'object' as const,
        properties: {
          docType: {
            type: 'string',
            enum: [
              'invoice',
              'salesreceipt',
              'creditnote',
              'receiptnote',
              'estimate',
              'salesorder',
              'waybill',
              'proform',
              'purchase',
              'purchaserefund',
              'purchaseorder',
            ],
            description: 'Document type',
          },
          serieId: {
            type: 'string',
            description: 'Serie ID to update',
          },
          name: {
            type: 'string',
            description: 'Serie name',
          },
          prefix: {
            type: 'string',
            description: 'Serie prefix',
          },
          nextNumber: {
            type: 'number',
            description: 'Next number in the serie',
          },
        },
        required: ['docType', 'serieId'],
      },
      destructiveHint: true,
      handler: async (args: { docType: string; serieId: string; [key: string]: unknown }) => {
        const { docType, serieId, ...body } = args;
        return client.put(`/numberseries/${docType}/${serieId}`, body);
      },
    },

    // Delete Numbering Serie
    delete_numbering_serie: {
      description: 'Delete a numbering serie',
      inputSchema: {
        type: 'object' as const,
        properties: {
          docType: {
            type: 'string',
            enum: [
              'invoice',
              'salesreceipt',
              'creditnote',
              'receiptnote',
              'estimate',
              'salesorder',
              'waybill',
              'proform',
              'purchase',
              'purchaserefund',
              'purchaseorder',
            ],
            description: 'Document type',
          },
          serieId: {
            type: 'string',
            description: 'Serie ID to delete',
          },
        },
        required: ['docType', 'serieId'],
      },
      destructiveHint: true,
      handler: async (args: { docType: string; serieId: string }) => {
        return client.delete(`/numberseries/${args.docType}/${args.serieId}`);
      },
    },
  };
}
