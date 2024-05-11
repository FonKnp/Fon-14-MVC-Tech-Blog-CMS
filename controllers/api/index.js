const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoute = require('./commentRoute');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comment', commentRoute);

module.exports = router;
