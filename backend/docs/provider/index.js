const getProviders = require('./getProviders');
const createProvider = require('./createProvider');
const updateProvider = require('./updateProvider');
const deleteProvider = require('./deleteProvider');

module.exports = {
  '/providers/list': {
    ...getProviders,
  },
  '/providers/{providerId}': {
    ...updateProvider,
    ...deleteProvider,
  },
  '/providers/create': {
    ...createProvider,
  },
};
