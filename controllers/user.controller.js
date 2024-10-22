const UserService = require("../services/user.services");

exports.getAll = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.json({ status: true, data: users });
    } catch (error) {
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { name, phone, password, confpass, type, profileImage, address, latitude, longitude, vehicleNumber } = req.body;

        // ตรวจสอบว่าข้อมูลจำเป็นครบถ้วน
        if (!name || !phone || !password || !confpass || !type) {
            return res.status(400).json({ status: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }

        // ตรวจสอบความถูกต้องของเบอร์โทรศัพท์
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ status: false, message: 'เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอกเบอร์โทรศัพท์ 10 หลัก' });
        }

        // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกัน
        if (password !== confpass) {
            return res.status(400).json({ status: false, message: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน' });
        }

        // ตรวจสอบข้อมูลเพิ่มเติมสำหรับประเภท 'user' และ 'rider'
        if (type === 'user') {
            if (!address || !latitude || !longitude) {
                return res.status(400).json({ status: false, message: 'ที่อยู่และพิกัด GPS จำเป็นสำหรับผู้ใช้' });
            }
        } else if (type === 'rider') {
            if (!vehicleNumber) {
                return res.status(400).json({ status: false, message: 'หมายเลขทะเบียนรถจำเป็นสำหรับไรเดอร์' });
            } 
        } else if (type === 'send') {
            if (!address || !latitude || !longitude) {
                return res.status(400).json({ status: false, message: 'ที่อยู่และพิกัด GPS จำเป็นสำหรับผู้ใช้' });
            }
        } else {
            return res.status(400).json({ status: false, message: 'ประเภทผู้ใช้ไม่ถูกต้อง' });
        }

        console.log('Attempting to register user:', { name, phone, type });

        // เรียกใช้ Service ในการลงทะเบียนผู้ใช้
        const successRes = await UserService.registerUser({
            name, phone, password, type, profileImage, address, gpsLocation: { latitude, longitude }, vehicleNumber
        });

        console.log('User registered successfully:', successRes);

        res.json({ status: true, success: "ลงทะเบียนสำเร็จ", data: successRes });
    } catch (error) {
        console.error('Error in user registration:', error);

        if (error.message === "หมายเลขโทรศัพท์ถูกใช้แล้ว") {
            return res.status(400).json({ status: false, message: error.message });
        }

        // ส่งข้อผิดพลาดที่ละเอียดมากขึ้นไปยัง error handler
        next(new Error(`Registration failed: ${error.message}`));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        // ตรวจสอบผู้ใช้ด้วยเบอร์โทรศัพท์
        const user = await UserService.checkUserByPhone(phone);
        if (!user) {
            return res.status(404).json({ status: false, message: 'ไม่พบผู้ใช้งาน' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ status: false, message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        // ตรวจสอบประเภทผู้ใช้
        const userType = user.type;
        if (userType !== 'user' && userType !== 'rider') {
            return res.status(403).json({ status: false, message: 'ประเภทผู้ใช้ไม่ถูกต้อง' });
        }

        // สร้าง token
        let tokenData = { _id: user._id, phone: user.phone, type: user.type };
        const token = await UserService.generateToken(tokenData, "secretKey", '1h');

        res.status(200).json({ status: true, token: token, userType: userType });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
    }
};

exports.logout = async (req, res, next) => {
    try {
        // ฟังก์ชัน logout สามารถทำงานได้โดยการลบ token ฝั่ง client
        res.status(200).json({ status: true, message: 'ออกจากระบบสำเร็จ' });
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // รับ userId จาก params
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'ไม่พบผู้ใช้' });
        }
        res.json({ status: true, data: user });
    } catch (error) {
        res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาด', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId; // รับ userId จาก params
        const updateData = req.body;
        const updatedUser = await UserService.updateUser(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ status: false, message: 'ไม่พบผู้ใช้' });
        }
        res.json({ status: true, message: 'อัปเดตโปรไฟล์สำเร็จ', data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: false, message: 'เกิดข้อผิดพลาด', error: error.message });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        const userId = req.params.userId; // รับ userId จาก params
        const image = req.body.image; // รับข้อมูลภาพจาก body
        const updatedUser = await UserService.updateProfileImage(userId, image);
        res.json({ status: true, message: 'อัปโหลดรูปภาพโปรไฟล์สำเร็จ', data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'ไม่พบผู้ใช้' });
        }
        res.json({ status: true, data: user });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await UserService.updateUser(userId, updateData);
        res.json({ status: true, message: 'อัปเดตผู้ใช้สำเร็จ', data: updatedUser });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await UserService.deleteUser(userId);
        res.json({ status: true, message: 'ลบผู้ใช้สำเร็จ' });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { phone, newPassword } = req.body; // ดึงข้อมูลจาก request body
        const result = await UserService.resetPassword(phone, newPassword);
        if (result) {
            return res.json({ status: true, message: 'รีเซ็ตรหัสผ่านสำเร็จ' });
        }
        return res.status(404).json({ status: false, message: 'ไม่พบผู้ใช้ที่มีเบอร์โทรศัพท์นี้' });
    } catch (error) {
        next(error);
    }
};




