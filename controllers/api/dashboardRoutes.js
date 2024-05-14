const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: User }],
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;