// File: controllers/food.controller.js
const foodService = require('../services/food.service');

class FoodController {
  async createFood(req, res) {
    try {
      const foodData = req.body;
      const newFood = await foodService.createFood(foodData);
      res.status(201).json({
        success: true,
        message: 'Food created successfully',
        data: newFood
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllFood(req, res) {
    try {
      const foods = await foodService.getAllFood();
      res.status(200).json({
        success: true,
        data: foods
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getFoodById(req, res) {
    try {
      const { id } = req.params;
      const food = await foodService.getFoodById(id);
      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Food not found'
        });
      }
      res.status(200).json({
        success: true,
        data: food
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getFoodByName(req, res) {
    try {
      const { name } = req.params;
      const foods = await foodService.getFoodByName(name);
      if (foods.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No food found with that name'
        });
      }
      res.status(200).json({
        success: true,
        data: foods
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  

  async updateFood(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedFood = await foodService.updateFood(id, updateData);
      if (!updatedFood) {
        return res.status(404).json({
          success: false,
          message: 'Food not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Food updated successfully',
        data: updatedFood
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteFood(req, res) {
    try {
      const { id } = req.params;
      const deletedFood = await foodService.deleteFood(id);
      if (!deletedFood) {
        return res.status(404).json({
          success: false,
          message: 'Food not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Food deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new FoodController();