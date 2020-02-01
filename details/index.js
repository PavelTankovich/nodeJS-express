const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
/**
 * объект для конфигурации и исп-ия handlebars
 */
const hbs = exphbs.create({
    // основной лайоут
    defaultLayout: 'main',
    // замена название extension (по умлч. handlebars), для упрощения
    extname: 'hbs',
});

/**
 * Регистрация модуля handlebars в express для реднер-га страниц
 * 1 параметр - название движка
 * 2 параметр - новый объект
 */
app.engine('hbs', hbs.engine);

/**
 * Указываем какой engine мы будем исп-ть
 */
app.set('view engine', 'hbs');

/**
 * Папка для хранения шаблонов
 */
app.set('views', 'views');

/**
 * Метод позволяет добавлять доп-ую функц-ть (middleware)
 * express.static('public') - метод установки поиска статики для express
 */
app.use(express.static('public'));

/**
 * Обработка get запросов, для роутинга мы можем исп-ть Route из express 
 * в отдельном файле
 * 1 параметр - путь
 * 2 параметр - коллбек который принимает
 * * 1 параметр request - запрос на сервер
 * * 2 параметр response - ответ сервера
 * * 3 параметр next - доп функция TODO
 */
app.get('/', (req, res) => {
    res.status(200); // по умолч. статус 200 (можно не указывать)
    // после установки движка handlebars, данная строка не понадобится
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
    // заменена на строку ниже (расширение .hbs указано в конфиг-ии)
    res.render('index'); 
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});