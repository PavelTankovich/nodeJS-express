const {Router} = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.render('courses', {
        title: 'Courses page',
        isCourses: true
    }); 
});

module.exports = router;