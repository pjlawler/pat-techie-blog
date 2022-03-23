const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res)=> {
    res.status(469).end();
});

module.exports = router;
