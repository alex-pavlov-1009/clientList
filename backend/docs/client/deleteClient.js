module.exports = {
  delete: {
    tags: ['Client CRUD operations'],
    description: 'Deleting a client',
    operationId: 'deleteClient',
    parameters: [
      {
        name: 'clientId',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Id of deliting client',
      },
    ],
    responses: {
      200: {
        description: 'Client deleted successfully',
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
