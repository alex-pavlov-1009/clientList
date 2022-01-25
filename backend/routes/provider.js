const express = require('express');
const router = express.Router();
const providerController = require('../controllers/provider.js');
const providerValidate = require('../validation/provider.js');

router.get('/list', providerController.getProviders);

router.put(
  '/:providerId',
  [providerValidate.paramRules, providerValidate.rules],
  providerController.updateProvider
);

router.post('/create', providerValidate.rules, providerController.addProvider);

router.delete(
  '/:providerId',
  providerValidate.paramRules,
  providerController.deleteProvider
);

module.exports = router;
