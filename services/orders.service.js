const Order = require('../model/orders.model');
const cloudinary = require('../config/cloudinary');

class OrderService {
  static async createOrder(orderData) {
    const order = new Order(orderData);
    await order.save();
    return order;
  }

  static async getOrders(senderId) {
    return Order.find({ sender: senderId }).sort({ createdAt: -1 });
  }

  static async getOrderDetails(orderId) {
    return Order.findById(orderId);
  }

  static async updateOrder(orderId, updateData) {
    const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  static async cancelOrder(orderId) {
    const order = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' });
    if (!order) {
      throw new Error('Order not found');
    }
  }

  static async uploadOrderImages(orderId, files) {
    if (!files || files.length === 0) {
        throw new Error('No files uploaded');
    }

    const uploadPromises = files.map(file => cloudinary.uploader.upload(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map(result => result.secure_url);

    await Order.findByIdAndUpdate(orderId, { $push: { imageUrls: { $each: imageUrls } } });

    return imageUrls;
}
}

module.exports = OrderService;