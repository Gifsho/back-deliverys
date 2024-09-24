// File: /routers/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./user.router');
// const orderRoutes = require('./order.routes');
// const locationRoutes = require('./location.routes');
// const searchRoutes = require('./search.routes');
// const notificationRoutes = require('./notification.routes');
// const reportRoutes = require('./report.routes');
// const paymentRoutes = require('./payment.routes');
// const feedbackRoutes = require('./feedback.routes');
// const adminRoutes = require('./admin.routes');

router.use('/api/users', userRoutes);
// router.use('/api/orders', orderRoutes);
// router.use('/api/location', locationRoutes);
// router.use('/api/search', searchRoutes);
// router.use('/api/notifications', notificationRoutes);
// router.use('/api/reports', reportRoutes);
// router.use('/api/payments', paymentRoutes);
// router.use('/api/feedback', feedbackRoutes);
// router.use('/api/admin', adminRoutes);

module.exports = router;