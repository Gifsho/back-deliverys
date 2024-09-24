const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(userData) {
        try {
            const { phone } = userData;

            // ตรวจสอบว่าหมายเลขโทรศัพท์มีอยู่แล้วหรือไม่
            const existingUser = await UserModel.findOne({ phone });
            if (existingUser) {
                throw new Error("หมายเลขโทรศัพท์ถูกใช้แล้ว");
            }

            // สร้างผู้ใช้ใหม่
            const createUser = new UserModel(userData);
            const savedUser = await createUser.save();

            // ส่งกลับผู้ใช้ที่สร้างใหม่
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    static async checkUserByPhone(phone) {
        try {
            return await UserModel.findOne({ phone });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwtExpire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwtExpire });
    }

    static async getAllUsers() {
        try {
            return await UserModel.find({});
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: ${error.message}`);
        }
    }
}

module.exports = UserService;
