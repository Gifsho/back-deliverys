// File: routes/food.router.js
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.post('/', foodController.createFood);
router.get('/', foodController.getAllFood);
router.get('/:id', foodController.getFoodById);
router.get('/name/:name', foodController.getFoodByName); // 
router.put('/:id', foodController.updateFood);
router.delete('/:id', foodController.deleteFood);

module.exports = router;