const getClients = require('./getClients');
const createClient = require('./createClient');
const updateClient = require('./updateClient');
const deleteClient = require('./deleteClient');

module.exports = {
  '/clients/list': {
    ...getClients,
  },
  '/clients/{clientId}': {
    ...updateClient,
    ...deleteClient,
  },
  '/clients/create': {
    ...createClient,
  },
};
