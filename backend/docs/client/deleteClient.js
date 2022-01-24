module.exports = {
  delete: {
    tags: ['Client CRUD operations'],
    description: 'Deleting a client',
    operationId: 'deleteClient',
    parameters: [
      {
        name: 'id',
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
              $ref: '#/components/schemas/Client',
            },
          },
        },
      },
    },
  },
};
