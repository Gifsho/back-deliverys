const Notification = require('../model/notification.model.js');

class NotificationService {
  static async sendNotification(userId, message) {
    const notification = new Notification({ user: userId, message });
    await notification.save();
    // Here you would typically use a real-time service like Socket.io or Firebase to push the notification to the user's device
    return notification;
  }

  static async getNotifications(userId) {
    return Notification.find({ user: userId }).sort('-createdAt');
  }
}

module.exports = NotificationService;