const NotificationService = require('../services/NotificationService');

class NotificationController {
  static async sendNotification(req, res) {
    try {
      const { userId, message } = req.body;
      const notification = await NotificationService.sendNotification(userId, message);
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getNotifications(req, res) {
    try {
      const { userId } = req.query;
      const notifications = await NotificationService.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NotificationController;