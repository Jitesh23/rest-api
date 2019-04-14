const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  {id : 1, name: 'Java'},
  {id: 2, name: 'node.js'},
  {id: 3, name: 'python'}
]


// router.get('/', (req, res) => {
//   res.send('Hello Mr. Jitesh Powankar');
// })

router.get('/', (req, res) => {
  res.send(courses);
})

router.get('/:id', (req, res) => {
  // res.write(req.params.id);
  let course = courses.find(c => c.id === parseInt(req.params.id))

  if (!course) return res.status(404).send('The course with this id is not found')

  res.send(course)
})

router.post('/', (req, res) => {

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

router.put('/:id', (req, res)=> {

  let course = courses.find(c => c.id === parseInt(req.params.id))

  if (!course) res.status(404).send('The course with this id is not found')

  const {error} = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;

  res.send(course);

})

router.delete('/:id', (req, res) => {
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


module.exports = router;
