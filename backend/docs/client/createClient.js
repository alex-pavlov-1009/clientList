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
              type: 'object',
              properties: {
                client: {
                  $ref: '#/components/schemas/Client',
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
