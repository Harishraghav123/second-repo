const mysql = require("mysql");

const con = mysql.createConnection({
    host:'127.0.0.1',
    user:"root",
    password:"",
    database:"node_database"
});

con.connect((err)=>{
    if(err){
        console.warn("error"+err);
    }else{
        console.warn("connected");
    }
})
module.exports.con = con;