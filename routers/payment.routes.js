const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');


router.post('/create', PaymentController.createPayment);
router.get('/:paymentId', PaymentController.getPaymentDetails);
router.post('/:paymentId/confirm', PaymentController.confirmPayment);

module.exports = router;