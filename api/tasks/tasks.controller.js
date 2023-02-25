const { UnprocessableEntityError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");
const { User } = require("../user/user.model");
const UserProvider = require("../user/user.provider");
const { Task } = require("./tasks.model");
const TasksProvider = require("./tasks.provider");


class TasksController {
    static async getTasks(filters = {}, projection = {}, options = {}) {
        const taskProvider = new TasksProvider(Task);
        return taskProvider.findTasks(filters, projection, options);
    }

    static async addTask(userId, name, description) {
        if (!(userId && name)) {
            throw new UnprocessableEntityError(MESSAGES.REQUIRED_FIELDS);
        }
        const userData = await UserProvider.findUser(User, { _id: userId }, '_id');
        if (!userData) {
            throw new UnprocessableEntityError(MESSAGES.NOT_FOUND_USER);
        }
        const taskProvider = new TasksProvider(Task);
        return taskProvider.createTask({
            userId,
            name,
            description: description ?? null
        });
    }
}

module.exports = TasksController;