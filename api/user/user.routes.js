const asyncWrapper = require('../../utils/asyncWrapper');
const UserView = require('./user.view');

const router = require('express').Router();


router.route('/')
  .get(asyncWrapper(UserView.getUsers))
  .post(asyncWrapper(UserView.addUser));
module.exports = router;