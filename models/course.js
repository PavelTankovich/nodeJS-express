const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course {
    constructor (name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = uuid();
    }

    getCourseInfo () {
        return {
            name: this.name,
            price: this.price,
            image: this.image,
            id: this.id,
        };
    };

    async save ()  {
        const courses = await Course.getAll();
        const newCourse = this.getCourseInfo();

        courses.push(newCourse);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '../data/courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) reject(err);
    
                    resolve();
                }
            );
        });
    };

    static getAll () {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '../data/courses.json'),
                'UTF-8',
                (err, content) => {
                    if (err) reject(err);
    
                    resolve(JSON.parse(content));
                }
            );
        });
    };
};

module.exports = Course;