const User = require('../model/user.model');

class UserService {
  static async searchUsers(query) {
    return await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ],
      type: 'user'  // Assuming 'user' role for recipients
    }).select('name email phone');  // Only return name and email
  }

  static async getAllRiders() {
    return User.find({ type: 'rider' }).select('name email');
  }
}

module.exports = UserService;