import mysql from 'mysql2/promise'


//Production
// const configProduction = {
//     host:"us-cdbr-east-05.cleardb.net",
//     user:"b6f9ccb0065180",
//     database:"heroku_fa1f6c8f445bc02",
//     password:"c8217cf3",
//     multipleStatements: true
// }

//Development
const config = {
    host:"localhost",
    user:"root",
    database:"repets",
    password:"admin",
    multipleStatements: true
}

export const query = async (queryString = "select 1 + 1 ") =>{
   const connection = await mysql.createConnection(config)
   const [rows] = await connection.execute(queryString)
   
   connection.end();
   return rows
}

