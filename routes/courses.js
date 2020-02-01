const {Router} = require('express');
const Course = require('./../models/course');
const router = new Router();

router.get('/', async (req, res) => {
    const courses = await Course.getAll();

    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    }); 
});

// /:id - для динамичной замены url
router.get('/:id', async (req, res) => {
    const course = await Course.getCourse(req.params.id);

    res.render('course', {
        layout: 'empty',
        title: `${course.name} page`,
        isCourses: true,
        course
    });
});

module.exports = router;