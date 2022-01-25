module.exports = {
  put: {
    tags: ['Client CRUD operations'],
    description: 'Update client',
    operationId: 'updateClient',
    parameters: [
      {
        name: 'clientId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Id of updating client',
      },
    ],
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
        description: 'Client updated successfully',
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
