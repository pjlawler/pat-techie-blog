const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/posts
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
            attributes:['id','username']
        },
        {
            model: Comment,
            attributes:['id', 'comment', 'created_at', 'updated_at'],
            include: [{
                model: User,
                attributes: ['id', 'username']
            }]
        }
    ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// GET /api/posts/1
router.get('/:id', (req, res) => {
    Post.findOne( {
        where: { id: req.params.id}
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'})
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// POST /api/posts
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// PUT /api/posts/1
router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: { id: req.params.id }
    })
    .then(dbPostData => {
        if(!dbPostData[0]) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// DELETE /api/posts/1
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {id: req.params.id }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
