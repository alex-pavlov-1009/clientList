const { requiredErrorText } = require('./errorMessages');
const ObjectId = require('mongodb').ObjectId;
const { body } = require('express-validator');
const Client = require('../models/client.js');

const phoneCheck = (value) => {
  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  if (!phoneRegExp.test(value)) {
    throw new Error('Phone is not valid.');
  }
  return true;
};

const clientFieldUniqueCheck = async (value, fieldName, erroeMsg, req) => {
  const id = req.params.clientId;
  const filter = {
    $and: [{ [fieldName]: value }],
  };
  if (id) {
    filter.$and.push({ _id: { $ne: ObjectId(id) } });
  }
  const clientWithSameValue = await Client.findOne(filter);
  if (clientWithSameValue !== null) {
    throw new Error(erroeMsg);
  }
  return true;
};

exports.rules = [
  body('data.name').not().isEmpty().withMessage(requiredErrorText),
  body('data.email').not().isEmpty().withMessage(requiredErrorText),
  body('data.email').isEmail().withMessage('Email is not valid.'),
  body('data.email').custom((value, { req }) =>
    clientFieldUniqueCheck(value, 'email', 'Email is not unique.', req)
  ),
  body('data.phone').not().isEmpty().withMessage(requiredErrorText),
  body('data.phone').custom(phoneCheck),
  body('data.phone').custom((value, { req }) =>
    clientFieldUniqueCheck(value, 'phone', 'Phone is not unique.', req)
  ),
  body('data.providers')
    .optional()
    .isArray()
    .withMessage('Providers are not valid.'),
];
