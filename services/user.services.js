const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

class UserService {
    static async registerUser(userData) {
        try {
            const { phone } = userData;

            console.log(`กำลังพยายามลงทะเบียนผู้ใช้ด้วยเบอร์โทรศัพท์: ${phone}`);

            // ตรวจสอบว่าหมายเลขโทรศัพท์มีอยู่แล้วหรือไม่
            const existingUser = await this.checkUserByPhone(phone);
            if (existingUser) {
                console.log(`เบอร์โทรศัพท์ ${phone} มีอยู่แล้ว`);
                throw new Error("หมายเลขโทรศัพท์ถูกใช้แล้ว");
            }

            // สร้างผู้ใช้ใหม่
            const createUser = new UserModel(userData);
            const savedUser = await createUser.save();

            console.log(`ลงทะเบียนผู้ใช้สำเร็จ: ${savedUser._id}`);

            // ส่งกลับผู้ใช้ที่สร้างใหม่ (ไม่รวมรหัสผ่าน)
            const { password, ...userWithoutPassword } = savedUser.toObject();
            return userWithoutPassword;
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้:', error);
            if (error.code === 11000) {
                throw new Error("หมายเลขโทรศัพท์ถูกใช้แล้ว");
            }
            throw error;
        }
    }

    static async checkUserByPhone(phone) {
        try {
            console.log(`กำลังตรวจสอบผู้ใช้ที่มีอยู่ด้วยเบอร์โทรศัพท์: ${phone}`);
            const user = await UserModel.findOne({ phone });
            console.log(`พบผู้ใช้: ${user ? 'ใช่' : 'ไม่'}`);
            return user;
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้ด้วยเบอร์โทรศัพท์:', error);
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
    static async getUserById(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('ไม่พบผู้ใช้');
            }
            return user;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้: ${error.message}`);
        }
    }

    static async updateUser(userId, updateData) {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                throw new Error('ไม่พบผู้ใช้');
            }
            return user;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการอัปเดตผู้ใช้: ${error.message}`);
        }
    }

    static async updateProfileImage(userId, image) {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, { profileImage: image }, { new: true });
            if (!user) {
                throw new Error('ไม่พบผู้ใช้');
            }
            return user;
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการอัปโหลดรูปภาพโปรไฟล์: ${error.message}`);
        }
    }

    static async deleteUser(userId) {
        try {
            const user = await UserModel.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('ไม่พบผู้ใช้');
            }
        } catch (error) {
            throw new Error(`เกิดข้อผิดพลาดในการลบผู้ใช้: ${error.message}`);
        }
    }

   
    static async resetPassword(phone, newPassword) {
        try {
            console.log(`กำลังพยายามรีเซ็ตรหัสผ่านสำหรับเบอร์โทรศัพท์: ${phone}`);
            const user = await UserModel.findOne({ phone });
            if (!user) {
                console.log(`ไม่พบผู้ใช้ที่มีเบอร์โทรศัพท์: ${phone}`);
                return false;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            await user.save();

            console.log(`รีเซ็ตรหัสผ่านสำเร็จสำหรับผู้ใช้: ${user._id}`);
            return true;
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน:', error);
            throw new Error(`เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน: ${error.message}`);
        }
    }

    
    
}

module.exports = UserService;
