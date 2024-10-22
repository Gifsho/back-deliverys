const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const LocationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

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
      orders: { type: Number, required: true, default: 1 },
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
    default: [],
  },
  pickupLocation: LocationSchema,  // พิกัดจุดรับ
  deliveryLocation: LocationSchema,  // พิกัดจุดส่ง
  gpsLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // เชื่อมกับโมเดล User เพื่อเก็บข้อมูลไรเดอร์
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel = db.model("Order", OrderSchema);

module.exports = OrderModel;
