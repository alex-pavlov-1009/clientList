const {
  REQUIRED_ERROR_TEXT,
  MONGO_ID_IS_NOT_VALID,
} = require('./errorMessages');
const { body, param } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;
const Provider = require('../models/provider.js');

const providerNameUniqueCheck = async (value, req) => {
  const id = req.params.providerId;
  const filter = {
    $and: [{ name: value }],
  };
  if (id) {
    filter.$and.push({ _id: { $ne: ObjectId(id) } });
  }
  const providerWithSameValue = await Provider.findOne(filter);
  if (providerWithSameValue !== null) {
    throw new Error('Provider name is not unique.');
  }
  return true;
};

exports.rules = [
  body('data.name').not().isEmpty().withMessage(REQUIRED_ERROR_TEXT),
  body('data.name').custom((value, { req }) =>
    providerNameUniqueCheck(value, req)
  ),
];

exports.paramRules = [
  param('providerId').isMongoId().withMessage(MONGO_ID_IS_NOT_VALID),
];
