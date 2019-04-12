const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const courses = [
    {id : 1, course: 'Java'},
    {id: 2, course: 'node.js'},
    {id: 3, course: 'python'}
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

    if (!course) res.status(404).send('The course with this id is not found')

    res.send(course)
})

app.post('/api/courses', (req, res) => {
    
    const course = {
        id : courses.length + 1,
        name : req.body.name
    }

    courses.push(course);
    res.send(course)
})


app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
})