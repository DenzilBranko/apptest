const express = require('express')
const router = express.Router()
// const Joi = require('@hapi/joi');
let model = require('../models/signup_model');
var bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('../config/jwt_config')
const userReg = require('./helper_controller')


router.post('/sign-up',async(req,res) => {
    let { data } = req.body
    userReg.userRegister(data,res,'user')
})

router.post('/admin/sign-up',async(req,res) => {
    let { data } = req.body
    userReg.userRegister(data,res,'admin')
})
router.post('/sign-in',async(req,res) => {
   
        try{
            email = req.body.data.email;
            password = req.body.data.password;
            let newdata = await model.userSignIn(email);
            
            if([newdata].length>0){
                let validPassword =  bcrypt.compareSync(password, newdata.password);
                if (!validPassword) return res.status(401).send({ auth: false, token: null });
                var token = JWT.sign({ id: newdata.email }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token,user_id:newdata.user_id });;
            }
            else{
                res.status(400).send({"message":"Data not found"})
            }
        }
        catch(error){
           
            res.status(500).send({"message":"server error"})
        }
        
    })
    



module.exports = router