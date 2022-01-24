module.exports = {
  put: {
    tags: ['Client CRUD operations'],
    description: 'Update client',
    operationId: 'updateClient',
    parameters: [
      {
        name: 'id',
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
