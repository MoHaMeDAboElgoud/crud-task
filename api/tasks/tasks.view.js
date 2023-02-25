const { InternalServerError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");
const TasksController = require("./tasks.controller");

class TaskView {
    static async getTasks(req, res) {
        try {
            const tasks = await TasksController.getTasks();
            res.send(tasks);
        } catch (error) {
            throw new InternalServerError(MESSAGES.UNPROCESSABLE_USERS, error);
        }
    }

    static async addTask(req, res) {
        try {
            const { userId, name, description } = req.body;
            const task = await TasksController.addTask(userId, name, description);
            res.send({ taskId: task._id });
        } catch (error) {
            throw new InternalServerError(MESSAGES.UNPROCESSABLE_USERS, error);
        }
    }
}

module.exports = TaskView;