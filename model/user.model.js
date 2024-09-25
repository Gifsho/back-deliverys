const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // ปรับ regex นี้ให้ตรงกับรูปแบบเบอร์โทรศัพท์ของคุณ
            },
            message: props => `${props.value} ไม่ใช่เบอร์โทรศัพท์ที่ถูกต้อง!`
        }
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['user', 'rider'],
        default: 'user'
    },
    profileImage: {
        type: String // URL สำหรับเก็บรูปโปรไฟล์
    },
    address: {
        type: String,
        required: function () { return this.type === 'user'; } // ที่อยู่ต้องมีสำหรับผู้ใช้ประเภท 'user'
    },
    gpsLocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    }, // พิกัด GPS สำหรับผู้ใช้ประเภท 'rider'
    vehicleNumber: {
        type: String,
        required: function () { return this.type === 'rider'; } // ทะเบียนรถต้องมีสำหรับผู้ใช้ประเภท 'rider'
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
        required: function () { return this.type === 'rider'; }
    }
}, { timestamps: true });

// เข้ารหัสรหัสผ่านก่อนบันทึก
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// เปรียบเทียบรหัสผ่านตอนเข้าสู่ระบบ
userSchema.methods.comparePassword = async function (userPassword) {
    try {
        return await bcrypt.compare(userPassword, this.password);
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('User', userSchema);

module.exports = UserModel;
