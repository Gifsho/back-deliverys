>
    git add .
>
    git commit -m "My Comment to Add File"
>
    git push -u origin main


> Run DB
> 
    npm start
>
> AND
> 
    node index dev

> ALL API CODE FOR SYSTEM (อันไหนคิดว่าไม่ได้ใช้ตัดออกเลย)

// 1. User Management #เสร็จ F.
router.post('/api/auth/register', UserController.register); // ลงทะเบียนผู้ใช้ใหม่ (ทั้งผู้ใช้ทั่วไปและไรเดอร์)
router.post('/api/auth/login', UserController.login); // เข้าสู่ระบบ
router.post('/api/auth/logout', UserController.logout); // ออกจากระบบ
router.get('/api/users/profile', UserController.getProfile); // ดึงข้อมูลโปรไฟล์ผู้ใช้
router.put('/api/users/profile', UserController.updateProfile); // อัพเดทข้อมูลโปรไฟล์ผู้ใช้
router.post('/api/users/profile/image', UserController.uploadProfileImage); // อัพโหลดรูปภาพโปรไฟล์
router.get('/api/users/:id', UserController.getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
router.put('/api/users/:id', UserController.updateUser); // อัปเดตข้อมูลผู้ใช้
router.delete('/api/users/:id', UserController.deleteUser); // ลบผู้ใช้
router.post('/api/users/reset-password', UserController.resetPassword); // รีเซ็ตรหัสผ่าน

// 2. Order Management
// Sender
router.post('/api/orders', UserController.createOrder); // สร้างคำสั่งส่งสินค้าใหม่
router.get('/api/orders', UserController.getOrders); // ดึงรายการคำสั่งส่งสินค้าทั้งหมดของผู้ส่ง
router.get('/api/orders/:orderId', UserController.getOrderDetails); // ดึงรายละเอียดคำสั่งส่งสินค้า
router.put('/api/orders/:orderId', UserController.updateOrder); // อัพเดทข้อมูลคำสั่งส่งสินค้า
router.delete('/api/orders/:orderId', UserController.cancelOrder); // ยกเลิกคำสั่งส่งสินค้า
router.post('/api/orders/:orderId/images', UserController.uploadOrderImages); // อัพโหลดรูปภาพสินค้า

// Receiver
router.get('/api/orders/incoming', UserController.getIncomingOrders); // ดึงรายการคำสั่งส่งสินค้าที่กำลังจะได้รับ
router.get('/api/orders/:orderId/status', UserController.getOrderStatus); // ตรวจสอบสถานะของคำสั่งส่งสินค้า

// Rider
router.get('/api/rider/orders/available', UserController.getAvailableOrders); // ดึงรายการคำสั่งส่งสินค้าที่พร้อมให้รับ
router.post('/api/rider/orders/:orderId/accept', UserController.acceptOrder); // รับงานส่งสินค้า
router.put('/api/rider/orders/:orderId/status', UserController.updateOrderStatus); // อัพเดทสถานะของคำสั่งส่งสินค้า
router.post('/api/rider/orders/:orderId/images', UserController.uploadDeliveryImages); // อัพโหลดรูปภาพยืนยันการรับและส่งสินค้า

// 3. Location Tracking #เสร็จ F.
router.post('/api/location/update', UserController.updateLocation); // อัพเดทตำแหน่งปัจจุบันของไรเดอร์
router.get('/api/location/rider/:riderId', UserController.getRiderLocation); // ดึงตำแหน่งปัจจุบันของไรเดอร์
router.get('/api/location/order/:orderId', UserController.getOrderLocation); // ดึงตำแหน่งของไรเดอร์ที่กำลังส่งสินค้าสำหรับคำสั่งนั้นๆ

// 4. Search and Management
router.get('/api/search/users', UserController.searchUsers); // ค้นหาผู้ใช้ (สำหรับค้นหาผู้รับ)
router.get('/api/riders', UserController.getAllRiders); // ดึงรายชื่อไรเดอร์ทั้งหมด (สำหรับผู้ดูแลระบบ)

// 5. Notifications
router.post('/api/notifications/send', UserController.sendNotification); // ส่งการแจ้งเตือนไปยังผู้ใช้
router.get('/api/notifications', UserController.getNotifications); // ดึงรายการแจ้งเตือนของผู้ใช้

// 6. Reports and Statistics
router.get('/api/reports/user/:userId', UserController.getUserReport); // ดึงรายงานสรุปการใช้งานของผู้ใช้
router.get('/api/reports/rider/:riderId', UserController.getRiderReport); // ดึงรายงานสรุปการทำงานของไรเดอร์
router.get('/api/stats/orders', UserController.getOrderStats); // ดึงสถิติเกี่ยวกับคำสั่งส่งสินค้า

// 7. Payment
router.post('/api/payments/create', UserController.createPayment); // สร้างรายการชำระเงิน
router.get('/api/payments/:paymentId', UserController.getPaymentDetails); // ดึงข้อมูลรายการชำระเงิน
router.post('/api/payments/:paymentId/confirm', UserController.confirmPayment); // ยืนยันการชำระเงิน

// 8. Feedback and Rating
router.post('/api/feedback', UserController.submitFeedback); // ส่งความคิดเห็นหรือให้คะแนน
router.get('/api/feedback/rider/:riderId', UserController.getRiderFeedback); // ดึงความคิดเห็นและคะแนนของไรเดอร์

// 9. System Management (สำหรับ Admin)
router.get('/api/admin/users', UserController.getAllUsers); // ดึงรายชื่อผู้ใช้ทั้งหมด
router.get('/api/admin/riders', UserController.getAllRiders); // ดึงรายชื่อไรเดอร์ทั้งหมด
router.put('/api/admin/users/:userId/status', UserController.updateUserStatus); // อัพเดทสถานะของผู้ใช้ (เช่น ระงับบัญชี)
router.get('/api/admin/stats', UserController.getSystemStats); // ดึงสถิติภาพรวมของระบบ

module.exports = router;
