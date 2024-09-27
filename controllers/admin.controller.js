const AdminService = require('../services/admin.services');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
        const users = await AdminService.getAllUsers();
        res.json({ status: true, data: users });
    } catch (error) {
        next(error);
    }
  }

  static async getAllRiders(req, res) {
    try {
      const riders = await AdminService.getAllRiders();
      res.status(200).json(riders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      const updatedUser = await AdminService.updateUserStatus(userId, status);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getSystemStats(req, res) {
    try {
      const stats = await AdminService.getSystemStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;