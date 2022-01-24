module.exports = {
  post: {
    tags: ['Client CRUD operations'],
    description: 'Create client',
    operationId: 'createClient',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                $ref: '#/components/schemas/ClientRequest',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Client created successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Client',
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
