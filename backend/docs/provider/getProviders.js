module.exports = {
  get: {
    tags: ['Provider CRUD operations'],
    description: 'Get providers',
    operationId: 'getProviders',
    parameters: [],
    responses: {
      200: {
        description: 'List of all providers',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Provider',
              },
            },
          },
        },
      },
    },
  },
};
