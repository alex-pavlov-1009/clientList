module.exports = {
  put: {
    tags: ['Provider CRUD operations'],
    description: 'Update provider',
    operationId: 'updateProvider',
    parameters: [
      {
        name: 'providerId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Id of updating provider',
      },
    ],
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
        description: 'Provider updated successfully',
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
