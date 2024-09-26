const Payment = require('../model/payment.model');
const Order = require('../model/orders.model'); 

class PaymentService {
    static async createPayment(paymentData) {
        // ดึงข้อมูลคำสั่งซื้อที่เกี่ยวข้อง
        const order = await Order.findById(paymentData.orderId);
        if (!order) {
            throw new Error('Order not found');
        }

         // ตรวจสอบสถานะของคำสั่งซื้อ
        if (order.status === 'cancelled') {
            throw new Error('Cannot create payment for a cancelled order');
        }

        // ใช้ totalAmount จากคำสั่งซื้อ
        const amount = order.totalAmount;
        
        // สร้างการชำระเงินใหม่
        const payment = new Payment({
            ...paymentData,
            amount: amount // กำหนด amount จากคำสั่งซื้อ
        });
        await payment.save();
        return payment;
    }

    static async getPaymentDetails(paymentId) {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    }

    static async confirmPayment(paymentId) {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }
        payment.status = 'confirmed';
        await payment.save();
        return payment;
    }
}

module.exports = PaymentService;
