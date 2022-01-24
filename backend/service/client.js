const Client = require('../models/client.js');
const mongoose = require('mongoose');

const clientService = {
  eraseProviderIdFromClients: async (providerId) => {
    const objectProviderId = mongoose.Types.ObjectId(providerId);
    await Client.updateMany(
      {
        providers: objectProviderId,
      },
      {
        $pull: { providers: objectProviderId },
      }
    );
  },
};

module.exports = clientService;
