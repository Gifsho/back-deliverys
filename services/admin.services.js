const User = require('../model/user.model');
const Order = require('../model/orders.model');

class AdminService {
  static async getAllUsers() {
    return await User.find({ type: 'user' });
    // return await User.find({ type: 'user' }).select('name email status');
  }

  static async getAllRiders() {
    return await User.find({ type: "rider" });
  }

  static async updateUserStatus(userId, status) {
    return User.findByIdAndUpdate(userId, { status }, { new: true });
  }

  static async getSystemStats() {
    const userCount = await User.countDocuments({ type: 'user' });
    const riderCount = await User.countDocuments({ type: 'rider' });
    const orderCount = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    return {
      userCount,
      riderCount,
      orderCount,
      totalRevenue: totalRevenue[0]?.total || 0
    };
  }
}

module.exports = AdminService;