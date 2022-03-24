const router = require('express').Router();
const { User } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id },
    })
    .then(dbUserData =>  {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// POST /api/users
router.post('/', (req, res) => {
    User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => { 
        req.session.user_id = dbUserData.id;
        req.session.user_name = dbUserData.user_name;
        req.session.loggedIn = true;   
        
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// PUT /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/login', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
    .then(dbUserData => {
        if(!dbUserData) { 
            res.status(400).json({message: "User email not found"});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }
        req.session.user_id = dbUserData.id;
        req.session.user_name = dbUserData.user_name;
        req.session.loggedIn = true;
           
        res.json({ user: dbUserData, message: 'You are now logged in!'})
        // res.json({ user: dbUserData })

    })

});
router.post('/logout', (req, res) => {
    console.log('=========================')
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end();
    }
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
