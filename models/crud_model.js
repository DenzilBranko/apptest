

const pool =  require('../config/db_config')

let getUserRecord = async(data="") => {
   
    let all_data = []
    let data_by_id = [];
   
    let query1 = `select full_name,email from tbl_user`;
    let query2 = `select full_name,email from tbl_user where id=$1`
    try {
        const client  = await pool.connect()
       if(data ==="") {
            all_data = await client.query(query1)
           
            return all_data.rows
       } else {
            data_by_id = await client.query(query2,[data]) 
            return data_by_id.rows;
       }
       
    } catch(error) {
        throw error
    } 
}

let  updateUser = async(data,id) => {
    let { email,fullname} = data
    
    let query1 = `select * from tbl_user where id=$1`;
    let check_existed = `select * from tbl_user where email=$1`;
    let query3 = `update tbl_user set full_name=$1,email=$2 where id=$3 returning id`;
    
    try {
        const client  = await pool.connect()
        let isRecord = await client.query(query1,[id])
        if(isRecord.rowCount>0) {
            let existed = await client.query(check_existed,[email])
            if(existed.rowCount>0) {
                return [{status: "duplicate"}]
            }
            let update_record = await client.query(query3,[fullname,email,id])
           
            if(update_record.rows.length>0) {
                return [{status: "updated"}]
            }
        } else {
            return [{status: "not found"}]
        }
     } catch(error) {
        throw error
    } 
}

let  deleteUser = async(id) => {
   let query1 = `select * from tbl_user where id=$1`;
   let query2 = `delete from tbl_user where id=$1`;
    
    try {
        const client  = await pool.connect()
        let isRecord = await client.query(query1,[id])
        if(isRecord.rowCount>0) {
           let delete_record = await client.query(query2,[0,id])
            if(delete_record.rows.length>0) {
                return [{status: "deleted"}]
            }
        } else {
            return [{status: "not found"}]
        }
     } catch(error) {
        throw error
    } f
}
module.exports = {
    getUserRecord,
    updateUser,
    deleteUser
}
