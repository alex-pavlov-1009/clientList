module.exports = {
  delete: {
    tags: ['Provider CRUD operations'],
    description:
      'Deleting a provider and linked provider ids in client documents',
    operationId: 'deleteProvider',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'Id of deliting provider',
      },
    ],
    responses: {
      200: {
        description: 'Provider deleted successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Provider',
            },
          },
        },
      },
    },
  },
};
