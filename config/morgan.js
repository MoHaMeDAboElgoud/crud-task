const morgan = require('morgan');

const logger = require('../utils/logger');

// message will be passed to morgan by the error middleware using res.locals property
morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (':remote-addr - ');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
	skip: (req, res) => res.statusCode >= 400,
	stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
	skip: (req, res) => res.statusCode < 400,
	stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
	errorHandler,
	successHandler,
};
