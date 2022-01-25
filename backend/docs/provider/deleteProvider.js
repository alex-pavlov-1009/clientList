module.exports = {
  delete: {
    tags: ['Provider CRUD operations'],
    description:
      'Deleting a provider and linked provider ids in client documents',
    operationId: 'deleteProvider',
    parameters: [
      {
        name: 'providerId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Id of deliting provider',
      },
    ],
    responses: {
      200: {
        description: 'Provider deleted successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                provider: {
                  $ref: '#/components/schemas/Provider',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Request validation failed',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ValidationError',
              },
            },
          },
        },
      },
    },
  },
};
