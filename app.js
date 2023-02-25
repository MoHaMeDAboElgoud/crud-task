const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { router } = require('./api');

const error = require('./config/error');
const morgan = require('./config/morgan');
const response = require('./config/response');

const app = express();



app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({
	extended: true,
	limit: '20mb',
	parameterLimit: 3000,
}));

app.use(compression());

app.use(cors({ credentials: true, exposedHeaders: ['Content-Type', 'Authorization'], origin: '*' }));

app.use(response);

app.use('/api', router);

app.use(error.notFound);
app.use(error.converter);
app.use(error.handler);

module.exports = app;
