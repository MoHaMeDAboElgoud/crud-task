const { UnprocessableEntityError } = require("../../utils/ApiError");
const MESSAGES = require("../../utils/messages");
const { User } = require("./user.model");
const UserProvider = require("./user.provider");
const bcrypt = require('bcrypt');


class UserController {

    static async checkRequiredFields(field) {
        return new Promise((resolve, reject) => {
            if (!field) {
                reject(new UnprocessableEntityError(MESSAGES.REQUIRED_FIELDS));
            } else {
                resolve("");
            }
        });
    }

    static async  validateUser(name, password, email) {
        const [foundEmail, hashedPassword] = await Promise.all([
            UserProvider.findUser(User, { email }, '_id'),
            bcrypt.hash(password, 10),
            UserController.checkRequiredFields(email),
            UserController.checkRequiredFields(name),
            UserController.checkRequiredFields(password),
        ]);
        if (foundEmail) {
            throw new UnprocessableEntityError(MESSAGES.DUPLICATED_EMAIL);
        }
        return {
            name,
            password: hashedPassword,
            email
        }
    }

    static async getUsers(filters = {}, projection = {}, options = {}) {
        return UserProvider.findUsers(User, filters, projection, options);
    }

    static async addUser(name, password, email) {
        const user = await UserController.validateUser(name, password, email);
        return UserProvider.createUser(User, user);
    }
}

module.exports = UserController;