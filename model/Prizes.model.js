const mongoose = require('mongoose');
const db = require('../config/db');

const prizeSchema = new mongoose.Schema({
    DrawID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WinningNumbers',
        required: true
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    TicketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    PrizeAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Prizes = db.model('Prizes', prizeSchema);
module.exports = Prizes;
