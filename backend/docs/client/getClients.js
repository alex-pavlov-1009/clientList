module.exports = {
  get: {
    tags: ['Client CRUD operations'],
    description: 'Get clients',
    operationId: 'getClients',
    parameters: [],
    responses: {
      200: {
        description: 'List of all clients',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Client',
              },
            },
          },
        },
      },
    },
  },
};
