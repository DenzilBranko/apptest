const pool =  require('../config/db_config')

const callRoleStatus = async(role) => {
  
    try {
        const client  = await pool.connect()
        let query = `select id from tbl_role where role_name=$1`
        let con_result = await client.query(query,[role])
        return con_result.rows;
    } catch(err) {
        throw err;
    }

}

module.exports = {
    callRoleStatus
}