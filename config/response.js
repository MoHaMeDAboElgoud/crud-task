const { HTTP_CODES } = require('../utils/codes');
const MESSAGES = require('../utils/messages');

const response = (req, res, next) => {
	res.ok = (message = MESSAGES.RESPONSE_OK, data) => {
		res.status(HTTP_CODES.SUCCESS.OK).send(
			{ data: JSON.stringify(data), message, statusCode: HTTP_CODES.SUCCESS.OK },
		);
	};
	return next();
};

module.exports = response;
