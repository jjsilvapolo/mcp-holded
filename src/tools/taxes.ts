import { HoldedClient } from '../holded-client.js';

export function getTaxTools(client: HoldedClient) {
  return {
    // Get Taxes
    get_taxes: {
      description: 'Get all available taxes',
      inputSchema: {
        type: 'object' as const,
        properties: {},
        required: [],
      },
      readOnlyHint: true,
      handler: async () => {
        return client.get('/taxes');
      },
    },
  };
}
