const router = require('express').Router();
const OrdersController = require("../controllers/orders.controller");
const upload = require("../util/multer");

// เส้นทางสำหรับลบออร์เดอร์ทั้งหมดที่ orders == 3
router.delete('/deleteAllOrdersWithThree', OrdersController.deleteAllOrdersWithThree);

router.post('/', OrdersController.createOrder);// สร้างคำสั่งส่งสินค้าใหม่
router.get('/', OrdersController.getOrders);// ดึงรายการคำสั่งส่งสินค้าทั้งหมดของผู้ส่ง
router.get('/:orderId', OrdersController.getOrderDetails);// ดึงรายละเอียดคำสั่งส่งสินค้า
router.put('/:orderId', OrdersController.updateOrder);// อัพเดทข้อมูลคำสั่งส่งสินค้า
router.delete('/:orderId', OrdersController.cancelOrder);// ยกเลิกคำสั่งส่งสินค้า
router.post('/:orderId/images', upload.array('images'), OrdersController.uploadOrderImages); // อัพโหลดรูปภาพสินค้า

// Receiver
router.get('/incoming', OrdersController.getIncomingOrders);// ดึงรายการคำสั่งส่งสินค้าที่กำลังจะได้รับ
router.get('/:orderId/status', OrdersController.getOrderStatus);// ตรวจสอบสถานะของคำสั่งส่งสินค้า

// Rider
router.get('/rider/available', OrdersController.getAvailableOrders);// ดึงรายการคำสั่งส่งสินค้าที่พร้อมให้รับ
router.post('/rider/:orderId/accept', OrdersController.acceptOrder);// รับงานส่งสินค้า
router.put('/rider/:orderId/status', OrdersController.updateOrderStatus);// อัพเดทสถานะของคำสั่งส่งสินค้า
router.post('/rider/:orderId/images', upload.array('images'), OrdersController.uploadDeliveryImages);// อัพโหลดรูปภาพยืนยันการรับและส่งสินค้า
router.get('/rider/active-delivery', OrdersController.getActiveDelivery);
router.post('/rider/:orderId/complete', OrdersController.completeDelivery);




module.exports = router;