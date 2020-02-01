const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course {
    constructor (name, price, image, id) {
        this.name = name;
        this.price = price;
        this.defaultPrice = price;
        this.image = image;
        this.id = id || uuid();
    }

    async save ()  {
        const courses = await Course.getAll();
        const newCourse = Course.getCourseInfo(this);

        courses.push(newCourse);

        return Course.writeCoursesToBD(courses);
    };

    static writeCoursesToBD (courses) {
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
    }

    static async updateCourse (course) {
        const courses = await Course.getAll();
        const index = courses.findIndex(_course => _course.id === course['c-id']);

        courses[index] = Course.getCourseInfo({
            name: course['c-name'],
            price: course['c-price'],
            image: course['c-image'],
            id: course['c-id']
        });
        
        return Course.writeCoursesToBD(courses);
    }

    static async getCourse (id) {
        const courses = await Course.getAll();

        return courses.find(course => course.id === id);
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
    
    static convertPrice (price) {
        return new Intl.NumberFormat('us-US', {
            currency: 'EUR',
            style: 'currency'
        }).format(price);
    }

    static getCourseInfo ({name, price, image, id}) {
        return {
            name,
            defaultPrice: price,
            price: Course.convertPrice(price),
            image,
            id,
        };
    };
};

module.exports = Course;