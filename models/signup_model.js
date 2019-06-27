const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const role = require('../models/helper');
const pool =  require('../config/db_config')


let userSignUp = async(data) => {
    try {
        let { fullname,email,password } = data
        let check_existed = `select * from tbl_user where email=$1`;
        let insert_data = `insert into tbl_user(full_name,email,password) values($1,$2,$3) returning id`
        let permision = `insert into user_permision(user_id,role_id) values($1,$2) returning id`
        
        const client  = await pool.connect()
        let existed = await client.query(check_existed,[email])
        if(existed.rowCount>0) {
            return {status: "duplicate"}
        }
        let role_result = await role.callRoleStatus('update')
        if(role_result.length<0) {
            return {status: "not foud"}
        }
        let  hashPassWord = await bcrypt.hashSync(password,10);
        let  user_result = await client.query(insert_data,[fullname,email,hashPassWord])
        
        if(user_result.rows.length>0) {
            let role_insert = await client.query(permision,[user_result.rows[0].id,role_result[0].id])
            if(role_insert.rows.length>0) {
                return {status: "done"}
            }
            return {status: "failed"}
        }
        return {status: "fail"}
    }catch(err) {
          throw err
    }
}


module.exports = {
    userSignUp,
}