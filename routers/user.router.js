const router = require('express').Router();
const UserController = require("../controllers/user.controller");

router.get('/users', UserController.getAll);
router.post('/registration',UserController.register);
router.post('/login',UserController.login);

router.post('/logout', UserController.logout); // ออกจากระบบ
router.get('/profile/:userId', UserController.getProfile); // ดึงข้อมูลโปรไฟล์ผู้ใช้ โดยใช้ userId ใน params
router.put('/profile/:userId', UserController.updateProfile); // อัปเดตข้อมูลโปรไฟล์ผู้ใช้ โดยใช้ userId ใน params
router.post('/profile/image/:userId', UserController.uploadProfileImage); // อัปโหลดรูปภาพโปรไฟล์ 

router.get('/:id', UserController.getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
router.put('/:id', UserController.updateUser); // อัปเดตข้อมูลผู้ใช้
router.delete('/:id', UserController.deleteUser); // ลบผู้ใช้
router.post('/reset-password', UserController.resetPassword); // รีเซ็ตรหัสผ่าน
// router.put('/change-password/:id', UserController.changePassword);// เปลี่ยนรหัสผ่าน



module.exports = router;

