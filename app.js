const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
    {id : 1, name: 'Java'},
    {id: 2, name: 'node.js'},
    {id: 3, name: 'python'}
]

app.get('/', (req, res) => {
    res.send('Hello Mr. Jitesh Powankar');
})

app.get('/api/courses', (req, res)=> {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    // res.write(req.params.id);
    let course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send('The course with this id is not found')

    res.send(course)
})

app.post('/api/courses', (req, res) => {

    const {error} = validateCourse(req.body);

    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course)
})

app.put('/api/courses/:id', (req, res)=> {

    let course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) res.status(404).send('The course with this id is not found')

    const {error} = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;

    res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
    //Look up the course
    //Not existing 404

    let course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course)  return res.status(404).send('The course with this id is not found')

    //Delete

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return  the same course

    res.send(course);

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
})
