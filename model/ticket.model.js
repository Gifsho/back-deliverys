const mongoose = require('mongoose');
const db = require('../config/db');

const ticketSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    LottoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lotto',
        required: true
    },
    PurchaseDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Ticket = db.model('Ticket', ticketSchema);
module.exports = Ticket;