const asyncWrapper = require('../../utils/asyncWrapper');
const TaskView = require('./tasks.view');

const router = require('express').Router();


router.route('/')
  .get(asyncWrapper(TaskView.getTasks))
  .post(asyncWrapper(TaskView.addTask));
module.exports = router;