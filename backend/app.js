const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');
require('dotenv').config();

const clientRouter = require('./routes/client.js');
const providerRouter = require('./routes/provider.js');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong. Please stand by.' });
});

app.use('/clients', clientRouter);
app.use('/providers', providerRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.listen(process.env.PORT, () => {
  console.log(`App listening at ${process.env.BASE_URL}:${process.env.PORT}`);
});

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      return console.log(err);
    }
  }
);
