const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const pg = require('pg');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());







 let signup_controller = require('./controller/signup');
// let user_controller = require('./admin/users/user_controller');

 app.use('/api/signup',signup_controller,(req,res,next) => {})
// app.use('/api/login',group_controller,(req,res,next) => {})
// app.use('/api/admin',group_controller,(req,res,next) => {})
// app.use('/api/crud',group_controller,(req,res,next) => {})


module.exports = app;