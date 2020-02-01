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

router.get('/:id/edit', async (req, res) => {
    //req.query => объект query параметров в ссылке ?name=pavel => {name: Pavel}
    if (!req.query.allow) return res.redirect('/');
    const course = await Course.getCourse(req.params.id);

    res.render('course-edit', {
        title: `${course.name} edit`,
        isCourses: true,
        course
    });
});

router.post('/edit', async (req, res) => {
    console.log(123)
    await Course.updateCourse(req.body);

    res.redirect('/courses');
});

module.exports = router;