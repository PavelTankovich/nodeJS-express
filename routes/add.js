const {Router} = require('express');
const Course = require('./../models/course');

const router = new Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Course page',
        isAdd: true
    }); 
});

router.post('/', async (req, res) => {
    const course = new Course(req.body['c-name'], req.body['c-price'], req.body['c-image']);

    await course.save();

    res.redirect('/courses')
});

module.exports = router;