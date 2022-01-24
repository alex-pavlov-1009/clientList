module.exports = {
  put: {
    tags: ['Provider CRUD operations'],
    description: 'Update provider',
    operationId: 'updateProvider',
    parameters: [
      {
        name: 'id',
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
