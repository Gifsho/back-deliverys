// File: services/food.service.js
const FoodModel = require('../model/food.model');

class FoodService {
  async createFood(foodData) {
    try {
      const food = new FoodModel(foodData);
      await food.validate();
      return await food.save();
    } catch (error) {
      throw new Error(`Error creating food: ${error.message}`);
    }
  }

  async getAllFood() {
    try {
      return await FoodModel.find({ available: true });
    } catch (error) {
      throw new Error(`Error fetching foods: ${error.message}`);
    }
  }

  async getFoodById(id) {
    try {
      return await FoodModel.findById(id);
    } catch (error) {
      throw new Error(`Error fetching food: ${error.message}`);
    }
  }

  async getFoodByName(name) {
    try {
      return await FoodModel.find({ name: new RegExp(name, 'i'), available: true }); // ใช้ RegExp เพื่อค้นหาชื่อที่มีความยืดหยุ่น
    } catch (error) {
      throw new Error(`Error fetching food by name: ${error.message}`);
    }
  }
  

  async updateFood(id, updateData) {
    try {
      updateData.updatedAt = Date.now();
      return await FoodModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error updating food: ${error.message}`);
    }
  }

  async deleteFood(id) {
    try {
      return await FoodModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting food: ${error.message}`);
    }
  }
}

module.exports = new FoodService();