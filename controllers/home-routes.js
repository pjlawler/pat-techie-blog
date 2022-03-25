const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/post/:id', (req, res) => {
  Post.findAll({
    where: { id: req.params.id },
    attributes:[
        'id',
        'title',
        'contents',
        'created_at',
        'updated_at'
    ],
    include: [{
        model: User,
        attributes:['id','user_name']
    },
    {
        model: Comment,
        attributes:['id', 'comment', 'created_at', 'updated_at'],
        include: [{
            model: User,
            attributes: ['id', 'user_name']
        }]
    }
  ]
  })
  .then(dbPostData => {
    if(!dbPostData[0]){
      res.render('error-page', {message: 'No post found with this id'});
      return;
    }
    const post = dbPostData[0].get({ plain: true });
    res.render('single-post', { post });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
});



router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes:[
        'id',
        'title',
        'contents',
        'created_at',
        'updated_at'
    ],
    include: [{
        model: User,
        attributes:['id','user_name']
    },
    {
        model: Comment,
        attributes:['id', 'comment', 'created_at', 'updated_at'],
        include: [{
            model: User,
            attributes: ['id', 'user_name']
        }]
    }
  ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }))
    res.render('homepage', { posts });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {

  if(req.session.loggedIn) {
    console.log('==================================')
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports = router;

