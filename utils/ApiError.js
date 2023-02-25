/* eslint-disable max-classes-per-file */
const { HTTP_CODES } = require('./codes');
const MESSAGES = require('./messages');

class ApiError extends Error {
	constructor(
		statusCode = HTTP_CODES.SERVER.INTERNAL,
		message = MESSAGES.INTERNAL_SERVER_ERROR,
		error = null,
		isOperational = true,
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		if (error) {
			if (error instanceof Error) {
				if (error.stack) {
					this.stack = error.stack;
				} else {
					Error.captureStackTrace(this, this.constructor);
				}
			} else {
				this.stack = error;
			}
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
		this.setSentryErrorLevel()
	}
	setSentryErrorLevel(){
		if (process.env.NODE_ENV == 'production') {
		  let status = Number(this.statusCode)
		  if(status >= 500){
			Sentry.setTag("Type", 'ERROR');
		  }else{
			Sentry.setTag("Type", 'WARN');
		  }
		  Sentry.setTag("status", status);
		  Sentry.captureException(this);
		}
	}

}

class BadRequestError extends ApiError {
	constructor(message = MESSAGES.BAD_REQUEST_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.BAD_REQUEST, message, error, true);
	}
}

class UnauthorizedError extends ApiError {
	constructor(message = MESSAGES.UNAUTHORIZED_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.UNAUTHORIZED, message, error, true);
	}
}

class ForbiddenError extends ApiError {
	constructor(message = MESSAGES.FORBIDDEN_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.FORBIDDEN, message, error, true);
	}
}

class NotFoundError extends ApiError {
	constructor(message = MESSAGES.NOT_FOUND_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.NOT_FOUND, message, error, true);
	}
}

class ConflictError extends ApiError {
	constructor(message = MESSAGES.CONFLICT_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.CONFLICT, message, error, true);
	}
}

class UnprocessableEntityError extends ApiError {
	constructor(message = MESSAGES.UNPROCESSABLE_ENTITY_ERROR, error = null) {
		super(HTTP_CODES.CLIENT.UNPROCESSABLE_ENTITY, message, error, true);
	}
}

class InternalServerError extends ApiError {
	constructor(message = MESSAGES.INTERNAL_SERVER_ERROR, error = null) {
		super(HTTP_CODES.SERVER.INTERNAL, message, error, true);
	}
}

module.exports = {
	ApiError,
	BadRequestError,
	ConflictError,
	ForbiddenError,
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
	UnprocessableEntityError,
};
