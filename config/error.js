const _ = require('lodash');

const { ApiError, InternalServerError, NotFoundError } = require('../utils/ApiError');

const converter = (err, req, res, next) => {
	next(err instanceof ApiError ? err : new InternalServerError({ stack: err }));
};

const handler = (err, req, res, next) => {
	const error = new InternalServerError(undefined, err);
	res.locals.errorMessage = err.message;
	const response = _.pick(error, ['statusCode', 'message', 'stack']);
	res.status(response.statusCode).send(response);
};

const notFound = (req, res, next) => next(new NotFoundError());

module.exports = {
	converter, handler, notFound,
};
