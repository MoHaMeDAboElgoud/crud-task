const { taskRoutes } = require('./tasks');
const { userRoutes } = require('./user');

const router = require('express').Router();




// router.use('/auth/', auth.routes);

router.use('/user/', /*asyncWrapper(middleware.authentication),*/ userRoutes);
router.use('/task/', /*asyncWrapper(middleware.authentication),*/ taskRoutes);




module.exports = { router };