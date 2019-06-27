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