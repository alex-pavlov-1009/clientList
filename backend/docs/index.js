const swaggerConfig = require('./swaggerConfig');
const tags = require('./tags');
const components = require('./components');
const client = require('./client');
const provider = require('./provider');

module.exports = {
  ...swaggerConfig,
  ...tags,
  ...components,
  paths: { ...client, ...provider },
};
