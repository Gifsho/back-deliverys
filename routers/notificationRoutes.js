const router = require('express').Router();
const NotificationController = require("../controllers/NotificationController");

router.post('/send', NotificationController.sendNotification);// ส่งการแจ้งเตือนไปยังผู้ใช้
router.get('/', NotificationController.getNotifications);// ดึงรายการแจ้งเตือนของผู้ใช้


module.exports = router;