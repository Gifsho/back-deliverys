const router = require('express').Router();
const admin = require("../controllers/admin.controller");

router.get('/users', admin.getAllUsers); // ดึงรายชื่อผู้ใช้ทั้งหมด
router.get('/riders', admin.getAllRiders); // ดึงรายชื่อไรเดอร์ทั้งหมด
router.put('/users/:userId/status', admin.updateUserStatus); // อัพเดทสถานะของผู้ใช้ (เช่น ระงับบัญชี)
router.get('/stats', admin.getSystemStats); // ดึงสถิติภาพรวมของระบบ


module.exports = router;

