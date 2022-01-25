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
