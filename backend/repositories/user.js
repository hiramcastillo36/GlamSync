const User = require("../models/User");

class UserRepository{
    static async create(userData){
        const user = new User(userData);
        return await user.save();
    }

    static async getOne(query){
        const user = await User.findOne(query);
        return user;
    }
}

module.exports = {
    UserRepository
};
