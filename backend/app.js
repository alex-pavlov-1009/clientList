const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');
const { BAD_RESPONSE, NOT_FOUND } = require('./const');
require('dotenv').config();

const clientRouter = require('./routes/client.js');
const providerRouter = require('./routes/provider.js');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/clients', clientRouter);
app.use('/providers', providerRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use(function (req, res, next) {
  res.status(NOT_FOUND).json({ msg: 'Route not found' });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(BAD_RESPONSE)
    .json({ msg: 'Something went wrong. Please stand by.' });
});

let appServer;

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    appServer = app.listen(process.env.PORT, () => {
      console.log(
        `App listening at ${process.env.BASE_URL}:${process.env.PORT}`
      );
    });
  });

function errorHandler() {
  if (appServer) {
    appServer.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);

process.on('SIGTERM', () => {
  if (appServer) {
    appServer.close();
  }
});
