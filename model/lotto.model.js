const mongoose = require('mongoose');
const db = require('../config/db');

const lottoSchema = new mongoose.Schema({
    LottoNumber: {
        type: String,
        required: true,
        unique: true,
        length: 6
    },
    DrawDate: {
        type: Date,
        required: true
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    Amount: {
        type: Number,
        required: true,
        min: 0
    },
    lotto: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

// สร้าง index สำหรับการค้นหาที่รวดเร็วขึ้น
lottoSchema.index({ LottoNumber: 1 });
lottoSchema.index({ DrawDate: 1 });

const Lotto = db.model('Lotto', lottoSchema);

module.exports = Lotto;