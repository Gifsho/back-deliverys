const router = require('express').Router();
const LocationController = require("../controllers/LocationController");

router.post('/update', LocationController.updateLocation); // อัพเดทตำแหน่งปัจจุบันของไรเดอร์
router.get('/rider/:riderId', LocationController.getRiderLocation); // ดึงตำแหน่งปัจจุบันของไรเดอร์
router.get('/order/:orderId', LocationController.getOrderLocation); // ดึงตำแหน่งของไรเดอร์ที่กำลังส่งสินค้าสำหรับคำสั่งนั้นๆ

module.exports = router;