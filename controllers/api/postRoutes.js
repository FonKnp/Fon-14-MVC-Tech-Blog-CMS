const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        }
      ]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { 
      posts, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username','id'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username','id'],
            },
          ],
        },
      ],
    }
    );
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    const post = postData.get({ plain: true });

    res.render('singlePost', { 
      post, 
      logged_in: req.session.logged_in ,
      currentUserID:req.session.userId
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
    });
    res.status(200).redirect(`/`);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updatedPost] = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).render('404',{ message: 'No post found with this id!'})
      return;
    }

    res.status(200).json({message:"Successfully updated"});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
