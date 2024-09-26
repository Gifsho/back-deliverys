const PaymentService = require('../services/PaymentService');

class PaymentController {
  static async createPayment(req, res) {
    try {
      const paymentData = req.body;
      const payment = await PaymentService.createPayment(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getPaymentDetails(req, res) {
    try {
      const { paymentId } = req.params;
      const payment = await PaymentService.getPaymentDetails(paymentId);
      res.status(200).json(payment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async confirmPayment(req, res) {
    try {
      const { paymentId } = req.params;
      const confirmedPayment = await PaymentService.confirmPayment(paymentId);
      res.status(200).json(confirmedPayment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PaymentController;