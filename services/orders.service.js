const Order = require("../model/orders.model");
const cloudinary = require("../config/cloudinary");

class OrderService {
  static async createOrder(orderData) {
    const order = new Order(orderData);
    await order.save();
    return order;
  }

  static async getOrders() {
    return await Order.find().sort({ createdAt: -1 });
  }

  static async getOrderDetails(orderId) {
    return Order.findById(orderId);
  }

  static async updateOrder(orderId, updateData) {
    const order = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  static async cancelOrder(orderId) {
    const order = await Order.findByIdAndUpdate(orderId, {
      status: "cancelled",
    });
    if (!order) {
      throw new Error("Order not found");
    }
  }

  static async uploadOrderImages(orderId, files) {
    if (!files || files.length === 0) {
      throw new Error("No files uploaded");
    }

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    await Order.findByIdAndUpdate(orderId, {
      $push: { imageUrls: { $each: imageUrls } },
    });

    return imageUrls;
  }

  static async getIncomingOrders(userId) {
    return Order.find({ receiver: userId, status: { $in: ["processing", "shipping"] } });
  }

  static async getOrderStatus(orderId) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order.status;
  }

  static async getAvailableOrders() {
    return Order.find({ status: "pending" });
  }

  static async acceptOrder(orderId, riderId) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { rider: riderId, status: "processing" },
      { new: true }
    );
    
    if (!order) throw new Error("Order not found");
    return order;
  }

  static async updateOrderStatus(orderId, status, riderId) {
    const order = await Order.findOne({ _id: orderId, rider: riderId });
    if (!order) {
      throw new Error("ไม่พบ Order หรือ Order ไม่ได้ถูกมอบหมายให้ rider คนนี้");
    }
    
    order.status = status;
    await order.save();
    return order;
  }

  static async uploadDeliveryImages(orderId, files, riderId) {
    const order = await Order.findOne({ _id: orderId, rider: riderId });
    if (!order)
      throw new Error("Order not found or not assigned to this rider");

    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);
    order.deliveryImages = imageUrls;
    await order.save();

    return imageUrls;
  }

  static async getActiveDelivery(riderId) {
    const activeOrder = await Order.findOne({
      rider: riderId,
      status: { $in: ["processing", "shipping"] }
    });

    return activeOrder || null;
  }

  static async completeDelivery(orderId) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");
  
    // อัพเดทสถานะเป็น delivered
    order.status = "delivered";
    await order.save();
  
    return order;
  }
  
}

module.exports = OrderService;