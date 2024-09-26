const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    read: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

// ในกรณีที่ต้องการเพิ่ม methods หรือ middleware ก่อนบันทึก
notificationSchema.pre('save', function(next) {
    // ทำอะไรบางอย่างก่อนบันทึก เช่น ตรวจสอบข้อมูล
    next();
});

notificationSchema.methods.markAsRead = function() {
    this.read = true;
    return this.save();
};

const NotificationModel = db.model('Notification', notificationSchema);

module.exports = NotificationModel;