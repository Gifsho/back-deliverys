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
        } else {
            return res.status(400).json({ status: false, message: 'ประเภทผู้ใช้ไม่ถูกต้อง' });
        }

        // เรียกใช้ Service ในการลงทะเบียนผู้ใช้
        const successRes = await UserService.registerUser({
            name, phone, password, type, profileImage, address, gpsLocation: { latitude, longitude }, vehicleNumber
        });

        res.json({ status: true, success: "ลงทะเบียนสำเร็จ", data: successRes });
    } catch (error) {
        next(error);
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
