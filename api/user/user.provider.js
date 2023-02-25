

class UserProvider {

    static async findUsers(userProvider, filters = {}, projection = {}, options = {}) {
        return userProvider.find(filters, projection, options);
    }

    static async findUser(provider, filters = {}, projection = {}, options = {}) {
        return provider.findOne(filters, projection, options);
    }

    static async createUser(userProvider, user) {
        const newUser = new userProvider(user);
        return newUser.save();
    }
}

module.exports = UserProvider;