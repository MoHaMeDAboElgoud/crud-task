
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./utils/logger');

const port = 3000;

let server;

const mongoOptions = {
  autoIndex: false,
  socketTimeoutMS: 90000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(`mongodb://127.0.0.1:27017/task`, mongoOptions).then(() => {
	logger.info('Connected to MongoDB');
	server = app.listen(port, () => {
    logger.info(`Listening to port ${port}`);
  });
});
mongoose.set('strictQuery', false);

const exitHandler = (error) => {
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
	logger.info('SIGTERM received');
	if (server) {
		server.close();
	}
});