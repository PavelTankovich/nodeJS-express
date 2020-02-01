const express = require('express');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const cousesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
// TODO: изучить
app.use(express.urlencoded({extended: false}));
//регистрация роутов
app.use('/', homeRoutes);
app.use('/courses', cousesRoutes);
app.use('/add', addRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});