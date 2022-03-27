const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/withAuth');
const { Post, User, Comment } = require('../models');

router.get('/dashboard', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes:[
        'id',
        'title',
        'contents',
        'created_at',
        'updated_at'
    ],
    order: [
      ['created_at', 'DESC']
    ],
    include: [{
        model: User,
        attributes:['id','user_name']
    },
    {
        model: Comment,
        attributes:['id', 'comment', 'created_at', 'updated_at'],
        order: [
          ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['id', 'user_name']
        }]
    }
  ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('dashboard', { req, posts });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

})

router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', { req });
})

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
    order: [
      [Comment, 'created_at', 'DESC']
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
        }],
    }
  ]
  })
  .then(dbPostData => {
    if(!dbPostData[0]){
      res.render('error-page', {message: 'No post found with this id'});
      return;
    }
    const post = dbPostData[0].get({ plain: true });
    res.render('single-post', { req, post });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
});

router.get('/edit-post/:id', withAuth, (req, res) => {
  Post.findAll({
    where: { id: req.params.id },
    attributes:[
        'id',
        'title',
        'contents',
        'created_at',
        'updated_at'
    ],
    order: [
      [Comment, 'created_at', 'DESC']
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
        }],
    }
  ]
  })
  .then(dbPostData => {
    if(!dbPostData[0]){
      res.render('error-page', {message: 'No post found with this id'});
      return;
    }
    const post = dbPostData[0].get({ plain: true });
    res.render('edit-post', { req, post });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
})

router.get('/', (req, res) => {
  Post.findAll({
    attributes:[
        'id',
        'title',
        'contents',
        'created_at',
        'updated_at'
    ],
    order: [
      ['created_at', 'DESC']
    ],
    include: [{
        model: User,
        attributes:['id','user_name']
    },
    {
        model: Comment,
        attributes:['id', 'comment', 'created_at', 'updated_at'],
        order: [
          ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['id', 'user_name']
        }]
    }
  ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }))
    res.render('homepage', { req, posts });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {

  if(req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports = router;

