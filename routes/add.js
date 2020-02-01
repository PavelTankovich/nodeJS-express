const {Router} = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Course page',
        isAdd: true
    }); 
});

module.exports = router;