const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoute = require('./commentRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoute);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
