const OrderService = require('../services/orders.service');

class OrderController {
  static async createOrder(req, res) {
    try {
      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getOrders(req, res) {
    try {
      const orders = await OrderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getOrderDetails(req, res) {
    try {
      const order = await OrderService.getOrderDetails(req.params.orderId);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const updatedOrder = await OrderService.updateOrder(req.params.orderId, req.body);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async cancelOrder(req, res) {
    try {
      await OrderService.cancelOrder(req.params.orderId);
      res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async uploadOrderImages(req, res) {
    try {
        const imageUrls = await OrderService.uploadOrderImages(req.params.orderId, req.files);
        res.status(200).json({ imageUrls });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
}

module.exports = OrderController;