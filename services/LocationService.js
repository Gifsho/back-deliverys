const UserModel = require('../model/user.model');
const Order = require('../model/orders.model');

class LocationService {
  static async updateLocation(userId, latitude, longitude) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          'gpsLocation.latitude': latitude,
          'gpsLocation.longitude': longitude
        } 
      },
      { new: true }
    );
    return user.gpsLocation;
  }

  static async getRiderLocation(riderId) {
    const rider = await UserModel.findById(riderId)
      .select('gpsLocation')
      .lean();
    return rider?.gpsLocation;
  }

  static async getOrderLocation(orderId) {
    const order = await Order.findById(orderId)
      .populate('rider', 'gpsLocation')
      .lean();
    return order?.rider?.gpsLocation;
  }

  static async getOrderFullLocation(orderId) {
    const order = await Order.findById(orderId)
      .select('pickupLocation deliveryLocation rider')
      .populate('rider', 'gpsLocation')
      .lean();

    if (!order) {
      return null;
    }

    return {
      pickup: order.pickupLocation,
      delivery: order.deliveryLocation,
      currentLocation: order.rider?.gpsLocation || null
    };
  }

  static async getOrderLocations(orderId) {
    const order = await Order.findById(orderId)
      .select('pickupLocation deliveryLocation')
      .lean();
    
    if (!order) {
      return null;
    }

    return {
      pickupLocation: order.pickupLocation,
      deliveryLocation: order.deliveryLocation
    };
  }
}

module.exports = LocationService;
