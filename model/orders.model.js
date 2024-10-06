const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  imageUrls: {
    type: [String],
    default: []
},
gpsLocation: {
  latitude: { type: Number },
  longitude: { type: Number }
},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel = db.model("Order", OrderSchema);


module.exports = OrderModel;
