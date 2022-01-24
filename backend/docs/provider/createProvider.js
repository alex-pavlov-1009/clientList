module.exports = {
  post: {
    tags: ['Provider CRUD operations'],
    description: 'Create provider',
    operationId: 'createProvider',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                $ref: '#/components/schemas/ProviderRequest',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Provider created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Provider',
            },
          },
        },
      },
      500: {
        description: 'Server error or validation failed',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidationError',
            },
          },
        },
      },
    },
  },
};
