const { UnprocessableEntityError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");


class TasksProvider {
    constructor(provider) {
        if (!provider) {
            throw new UnprocessableEntityError(MESSAGES.PROVIDER_REQUIRED);
        }
        this.provider = provider;
    }

    async findTasks(filters = {}, projection = {}, options = {}) {
        return this.provider.find(filters, projection, options);
    }

    async createTask(task) {
        const newTask = new this.provider(task);
        return newTask.save();
    }
}

module.exports = TasksProvider;