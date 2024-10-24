// File: /routers/index.js
// index.routes.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user.router');
const orderRoutes = require('./order.router');
const locationRoutes = require('./Location_Tracking');
const notificationRoutes = require('./notificationRoutes');
const paymentRoutes = require('./payment.routes');
const searchRoutes = require('./management.router');
// const reportRoutes = require('./report.routes');
// const feedbackRoutes = require('./feedback.routes');
const adminRoutes = require('./admin.router');
const foodRoutes = require('./food.router');

router.use('/api/users', userRoutes);
router.use('/api/orders', orderRoutes);
router.use('/api/location', locationRoutes);
router.use('/api/notifications', notificationRoutes);
router.use('/api/payments', paymentRoutes);
router.use('/api/search', searchRoutes);
// router.use('/api/reports', reportRoutes);
// router.use('/api/feedback', feedbackRoutes);
router.use('/api/admin', adminRoutes);

router.use('/api/foods', foodRoutes);

module.exports = router;