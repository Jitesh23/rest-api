const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const logger = require('./logger');
const courses = require('./routes/courses');


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());

app.use(logger);

app.use('/api/courses', courses);

//console.log(`Application Environment: ${app.get('env')}`)

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail host: ${config.get('mail.host')}`);
console.log(`Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan is enabled');
}

app.listen(port, () =>{
    console.log(`Server is running on ${port}`);
})
