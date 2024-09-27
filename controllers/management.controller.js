const UserService = require('../services/management.services');

class UserController {
  static async searchUsers(req, res) {
    try {
      const { query } = req.query;
      const users = await UserService.searchUsers(query);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllRiders(req, res) {
    try {
      const riders = await UserService.getAllRiders();
      res.status(200).json(riders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;