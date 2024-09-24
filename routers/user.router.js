const router = require('express').Router();
const UserController = require("../controllers/user.controller");

router.get('/users', UserController.getAll);
router.post('/registration',UserController.register);
router.post('/login',UserController.login);

router.post('/logout', UserController.logout); // ออกจากระบบ
// router.get('/profile', UserController.getProfile); // ดึงข้อมูลโปรไฟล์ผู้ใช้
// router.put('/profile', UserController.updateProfile); // อัพเดทข้อมูลโปรไฟล์ผู้ใช้
// router.post('/profile/image', UserController.uploadProfileImage); // อัพโหลดรูปภาพโปรไฟล์
// router.get('/:id', UserController.getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
// router.put('/:id', UserController.updateUser); // อัปเดตข้อมูลผู้ใช้
// router.delete('/:id', UserController.deleteUser); // ลบผู้ใช้
// router.post('/reset-password', UserController.resetPassword); // รีเซ็ตรหัสผ่าน
// router.put('/change-password', UserController.changePassword); // เปลี่ยนรหัสผ่าน

module.exports = router;

