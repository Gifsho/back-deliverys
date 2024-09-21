const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');


class UserService {
    static async registerUser(name, email, phone, password, confpass) {
        try {
            // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                console.error("Email already in use");
                throw new Error("Email already in use");
            }

            // สร้างผู้ใช้ใหม่
            const createUser = new UserModel({ name, email, phone, password });
            const savedUser = await createUser.save();

            // สร้างกระเป๋าเงินให้กับผู้ใช้ใหม่
            // await WalletService.createWallet(savedUser._id, 1000); // กำหนดยอดเงินเริ่มต้นเป็น 0.00

            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    static async checkuser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }


    static async getUserWithWallet(userId) {
        try {
            const user = await UserModel.findOne(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const wallet = await WalletService.getWalletByUserId(userId);
            return { user, wallet };
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await UserModel.find({});
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    };
}

module.exports = UserService;
