const UserModel = require('../model/user.model');
const Order = require('../model/orders.model');

class LocationService {
  static async updateLocation(userId, latitude, longitude) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { 'location.coordinates': [longitude, latitude] } },
      { new: true }
    );
    return user.gpsLocation;
  }

  static async getRiderLocation(riderId) {
    const rider = await UserModel.findById(riderId).select('gpsLocation');
    return rider.gpsLocation;
  }

  static async getOrderLocation(orderId) {
    const order = await Order.findById(orderId).populate('sender', 'gpsLocation');
    return order.sender.gpsLocation;
  }
}

module.exports = LocationService;