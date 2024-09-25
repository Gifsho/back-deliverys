const router = require('express').Router();
const OrdersController = require("../controllers/orders.controller");
const upload = require("../util/multer");

router.post('/orders', OrdersController.createOrder); // สร้างคำสั่งส่งสินค้าใหม่ 
router.get('/orders', OrdersController.getOrders); // ดึงรายการคำสั่งส่งสินค้าทั้งหมดของผู้ส่ง 

router.get('/orders/:orderId', OrdersController.getOrderDetails); // ดึงรายละเอียดคำสั่งส่งสินค้า 
router.put('/orders/:orderId', OrdersController.updateOrder); // อัพเดทข้อมูลคำสั่งส่งสินค้า 
router.delete('/orders/:orderId', OrdersController.cancelOrder); // ยกเลิกคำสั่งส่งสินค้า 
router.post('/orders/:orderId/images', upload.array('images'), OrdersController.uploadOrderImages); // อัพโหลดรูปภาพสินค้า


module.exports = router;
