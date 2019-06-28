const express = require('express')
const router = express.Router()
const role_config = require('../config/config')
const helper = require('../models/helper')
const verifyToken = require('../services/auth_service')

router.post('/add-new-user',verifyToken,async(req,res) => {
    let data = req.body.data
    try {
        let isPermision = helper.checkPermision(data.user_id,role_config.write)
        if(!isPermision) {
            return res.status(403).send({message: "access forbidden"})
        }
        //creat user function and call the signup model
    } catch(e) {
        return res.status(500).send(e.stack)
    }

})

router.get('/view-user', verifyToken,async(req,res) => {
    let data = req.query.params
    try {

        let isPermision = helper.checkPermision(data.user_id,role_config.read)
        if(!isPermision) {
            return res.status(403).send({message: "access forbidden"})
        }

        let succes_result = await models.getUserRecord()
        if(succes_result.length>0) {
          return res.status(200).send(succes_result)
        }
        return res.status(204).send([{message: "empty"}])
      } catch(e) {
        return res.status(500).send(e)
      }
   
})

router.get('/get-user-by-id/:id',verifyToken,async(req,res) => {
    let id = req.params.id
    try {
        let isPermision = helper.checkPermision(data.user_id,role_config.read)
        if(!isPermision) {
            return res.status(403).send({message: "access forbidden"})
        }
        let succes_result = await models.getUserRecord(id)
        if(succes_result.length>0) {
            return res.status(200).send(succes_result)
        }
        return res.status(403).send([{message: "no record"}])
    } catch(e) {
        return res.status(500).send(e)
    }
   
})

router.put('/update-user/:id',verifyToken,async(req,res) => {
    let id = req.params.id
  let data = req.body.data
  try {
    let isPermision = helper.checkPermision(data.user_id,role_config.update)
    if(!isPermision) {
        return res.status(403).send({message: "access forbidden"})
    }
    let succes_result = await models.updateUser(data,id)
    if(succes_result[0].status === 'updated') {
      return res.status(200).send([{message: "ok"}])
    }
    if(succes_result[0].status === 'duplicate') {
      return res.status(409).send([{message: "duplicate"}])
    }
    return res.status(403).send([{message: "no record"}])
  } catch(e) {
    return res.status(500).send(e)
  }
})

router.delete('/delete-group/:id',verifyToken,async(req,res) => {
    let id = req.params.id
    try {
        let isPermision = helper.checkPermision(data.user_id,role_config.delete)
        if(!isPermision) {
            return res.status(403).send({message: "access forbidden"})
        }
      let succes_result = await models.deleteGroups(id)
     if(succes_result[0].status === 'deleted') {
        return res.status(200).send([{message: "ok"}])
      }
      return res.status(403).send([{message: "no record"}])
    } catch(e) {
      return res.status(500).send(e)
    }
   
})

module.exports = router