const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const FoodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true }, // Indicates if the food is available for order
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const FoodModel = db.model("Food", FoodSchema);

module.exports = FoodModel;
