import { HoldedClient } from '../holded-client.js';

export function getContactGroupTools(client: HoldedClient) {
  return {
    // List Contact Groups
    list_contact_groups: {
      description: 'List all contact groups',
      inputSchema: {
        type: 'object' as const,
        properties: {},
        required: [],
      },
      handler: async () => {
        return client.get('/contactgroups');
      },
    },

    // Create Contact Group
    create_contact_group: {
      description: 'Create a new contact group',
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Contact group name',
          },
        },
        required: ['name'],
      },
      handler: async (args: Record<string, unknown>) => {
        return client.post('/contactgroups', args);
      },
    },

    // Get Contact Group
    get_contact_group: {
      description: 'Get a specific contact group by ID',
      inputSchema: {
        type: 'object' as const,
        properties: {
          groupId: {
            type: 'string',
            description: 'Contact group ID',
          },
        },
        required: ['groupId'],
      },
      handler: async (args: { groupId: string }) => {
        return client.get(`/contactgroups/${args.groupId}`);
      },
    },

    // Update Contact Group
    update_contact_group: {
      description: 'Update an existing contact group',
      inputSchema: {
        type: 'object' as const,
        properties: {
          groupId: {
            type: 'string',
            description: 'Contact group ID to update',
          },
          name: {
            type: 'string',
            description: 'Contact group name',
          },
        },
        required: ['groupId'],
      },
      handler: async (args: { groupId: string; [key: string]: unknown }) => {
        const { groupId, ...body } = args;
        return client.put(`/contactgroups/${groupId}`, body);
      },
    },

    // Delete Contact Group
    delete_contact_group: {
      description: 'Delete a contact group',
      inputSchema: {
        type: 'object' as const,
        properties: {
          groupId: {
            type: 'string',
            description: 'Contact group ID to delete',
          },
        },
        required: ['groupId'],
      },
      handler: async (args: { groupId: string }) => {
        return client.delete(`/contactgroups/${args.groupId}`);
      },
    },
  };
}
