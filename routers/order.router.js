const router = require('express').Router();
const OrdersController = require("../controllers/orders.controller");
const upload = require("../util/multer");

router.post('/', OrdersController.createOrder);
router.get('/', OrdersController.getOrders);
router.get('/:orderId', OrdersController.getOrderDetails);
router.put('/:orderId', OrdersController.updateOrder);
router.delete('/:orderId', OrdersController.cancelOrder);
router.post('/:orderId/images', upload.array('images'), OrdersController.uploadOrderImages);

// Receiver
router.get('/incoming', OrdersController.getIncomingOrders);
router.get('/:orderId/status', OrdersController.getOrderStatus);

// Rider
router.get('/rider/available', OrdersController.getAvailableOrders);
router.post('/rider/:orderId/accept', OrdersController.acceptOrder);
router.put('/rider/:orderId/status', OrdersController.updateOrderStatus);
router.post('/rider/:orderId/images', upload.array('images'), OrdersController.uploadDeliveryImages);
router.get('/rider/active-delivery', OrdersController.getActiveDelivery);

module.exports = router;