const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.js');
const clientValidate = require('../validation/client.js');

router.get('/list', clientController.getClients);

router.put(
  '/:clientId',
  [clientValidate.paramRules, clientValidate.rules],
  clientController.updateClient
);

router.post('/create', clientValidate.rules, clientController.addClient);

router.delete(
  '/:clientId',
  clientValidate.paramRules,
  clientController.deleteClient
);

module.exports = router;
