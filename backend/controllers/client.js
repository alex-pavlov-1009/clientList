const Client = require('../models/client.js');
const Provider = require('../models/provider.js');
const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('../const');

exports.addClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json(errors.array());
  }
  const client = new Client(req.body.data);
  await client.save();
  return res.json({ client });
};

exports.getClients = async (req, res) => {
  const clients = await Client.find({}).populate({
    path: 'providers',
    model: Provider,
  });
  return res.json({ clients });
};

exports.updateClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json(errors.array());
  }
  const client = await Client.findByIdAndUpdate(
    req.params.clientId,
    req.body.data,
    { new: true }
  );
  return res.json({ client });
};

exports.deleteClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json(errors.array());
  }
  const client = await Client.findByIdAndDelete(req.params.clientId);
  return res.json({ client });
};
