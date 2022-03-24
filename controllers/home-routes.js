const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {

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

    res.render('login');

})





module.exports = router;

