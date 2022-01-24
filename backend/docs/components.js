module.exports = {
  components: {
    schemas: {
      Client: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Client identification number',
            example: '61e71f5a6dbed1de44979aaf',
          },
          name: {
            type: 'string',
            description: 'Client`s name',
            example: 'Samuel',
          },
          phone: {
            type: 'string',
            description: 'Client`s phone',
            example: '3055550000',
          },
          email: {
            type: 'string',
            description: 'Client`s email',
            example: 'user.sample@gmail.com',
          },
          providers: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Provider',
            },
          },
        },
      },
      ClientRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Client`s name',
            example: 'Samuel',
          },
          phone: {
            type: 'string',
            description: 'Client`s phone',
            example: '3055550000',
          },
          email: {
            type: 'string',
            description: 'Client`s email',
            example: 'user.sample@gmail.com',
          },
          providers: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Provider identification number',
              example: '61e8160ff9fd395800afd3ae',
            },
          },
        },
      },
      Provider: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Provider identification number',
            example: '61e8160ff9fd395800afd3ae',
          },
          name: {
            type: 'string',
            description: 'Provider`s name',
            example: 'Provider 1',
          },
        },
      },
      ProviderRequest: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Provider`s name',
            example: 'Provider 1',
          },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          msg: {
            type: 'string',
            description: 'Description of validation error',
            example: 'You have to fill this information.',
          },
          param: {
            type: 'string',
            description: 'Field`s name',
            example: 'data.email',
          },
          location: {
            type: 'string',
            description: 'Request section name with validation error',
            example: 'body',
          },
        },
      },
    },
  },
};
