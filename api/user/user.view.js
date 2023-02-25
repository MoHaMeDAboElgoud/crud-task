const { InternalServerError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");
const UserController = require("./user.controller");


class UserView {
    static async getUsers(req, res) {
        const users = await UserController.getUsers();
        res.send(users);
    }

    static async addUser(req, res) {
        try {
            const { name, password, email } = req.body;
            const user = await UserController.addUser(name, password, email);
            res.send({ userId: user._id });
        } catch (error) {
            throw new InternalServerError(MESSAGES.UNPROCESSABLE_USERS, error);
        }
    }
}

module.exports = UserView;