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

  static async getIncomingOrders(req, res) {
    try {
      const orders = await OrderService.getIncomingOrders(req.user.id);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const status = await OrderService.getOrderStatus(orderId);
      res.status(200).json({ status });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAvailableOrders(req, res) {
    try {
      const orders = await OrderService.getAvailableOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async acceptOrder(req, res) {
    try {
      const { orderId } = req.params;
      const { riderId } = req.body;

      if (!riderId) {
        return res.status(400).json({ message: "riderId is required" });
      }

      const updatedOrder = await OrderService.acceptOrder(orderId, riderId);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status, riderId } = req.body;

      if (!riderId) {
        return res.status(400).json({ message: "riderId is required" });
      }

      const updatedOrder = await OrderService.updateOrderStatus(orderId, status, riderId);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async uploadDeliveryImages(req, res) {
    try {
      const { orderId } = req.params;
      const imageUrls = await OrderService.uploadDeliveryImages(orderId, req.files, req.user.id);
      res.status(200).json({ imageUrls });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getActiveDelivery(req, res) {
    try {
      const { riderId } = req.query;

      if (!riderId) {
        return res.status(400).json({ message: 'riderId is required' });
      }

      const activeOrder = await OrderService.getActiveDelivery(riderId);
      if (activeOrder) {
        res.status(200).json(activeOrder);
      } else {
        res.status(200).json({ message: 'No active delivery' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async completeDelivery(req, res) {
    try {
      const { orderId } = req.params;
  
      const updatedOrder = await OrderService.completeDelivery(orderId); // ไม่ต้องส่ง riderId
  
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
}

module.exports = OrderController;