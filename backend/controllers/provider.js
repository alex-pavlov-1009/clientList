const Provider = require('../models/provider');
const clientService = require('../service/client');
const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('../const');

exports.addProvider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json(errors.array());
  }
  const provider = new Provider(req.body.data);
  await provider.save();
  return res.json({ provider });
};

exports.getProviders = async (req, res) => {
  const providers = await Provider.find({});
  return res.json({ providers });
};

exports.updateProvider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json(errors.array());
  }
  const provider = await Provider.findByIdAndUpdate(
    req.params.providerId,
    req.body.data,
    { new: true }
  );
  return res.json({ provider });
};

exports.deleteProvider = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json(errors.array());
  }
  await clientService.eraseProviderIdFromClients(req.params.providerId);
  const provider = await Provider.findByIdAndDelete(req.params.providerId);
  return res.json({ provider });
};
