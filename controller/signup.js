const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi');
let model = require('../models/signup_model');

router.post('/sign-up',async(req,res) => {
    let { data } = req.body
    const schema = Joi.object().keys({
        fullname: Joi.string().min(3).allow('').trim().strict(),
        email:   Joi.string().email({ minDomainSegments: 2 }),
        password:  Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).label("password must be 8 character in length(must have one one digit one ,character,one special character) "),
       
    });
    Joi.validate(data, schema, {abortEarly: false},async(err, value) => {
        if(err) {
            let errorlist = err.details.map(item => item.message)
            res.status(422).json({ errorlist});
        }
        try {
            let succes_result = await model.userSignUp(data)
         
            let { status } = succes_result
            console.log(status)
            if(status === "duplicate") {
                return res.status(409).send([{message: status}])
            } 
            //let return_message = status ==="fail"?"fail":"not found"
            if(status === "done") {
                return res.status(200).send(succes_result)
            } else {
                return res.status(403).send([{message: status}])
            }
            
        } catch(err) {
            
            return res.status(500).send({message: "fail"})
        }
           
    })
 
})

router.post('/sign-in',async(req,res) => {
   
        try{
            email = req.body.data.email;
            password = req.body.data.password;
            let newdata = await db.userLogin(email);
            if(newdata.id){
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