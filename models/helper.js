const pool =  require('../config/db_config')

const callRoleStatus = async(role1,role2='',app_user="") => {
  
    try {
        const client  = await pool.connect()
        let query;
       
        if(app_user ==='admin') {
            query = `select * from tbl_role`;
            con_result = await client.query(query)
        } else {
            query = `select id from tbl_role where role_name=$1 or role_name=$2`
            con_result = await client.query(query,[role1,role2])
        }
        return con_result.rows;
    } catch(err) {
       
        throw err;
    }

}

const checkPermision = async(user_id,role_name) => {
 
    try {
        let role = await callRoleStatus(role_name)
        let query = `select * from user_permision where user_id=$1 and role_id=$2`
        const client  = await pool.connect()
      
        let con_result = await client.query(query,[user_id,role[0].id])
        if(con_result.rows.length>0) {
            return true
        }
    } catch(err) {
        throw err;
    }

}

module.exports = {
    callRoleStatus,
    checkPermision

}