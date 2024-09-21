const mongoose = require('mongoose');
const db = require('../config/db');

const winningNumberSchema = new mongoose.Schema({
    DrawDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    LottoWin: {
        type: Number,
        required: true,
    },
    FirstPrize: Number,
    SecondPrize: Number,
    ThirdPrize: Number,
    FourthPrize: Number,
    FifthPrize: Number
}, {
    timestamps: true
});

const WinningNumbers = db.model('WinningNumbers', winningNumberSchema);

module.exports = WinningNumbers;
