const mysql = require("mysql2");

const Connection = mysql.createConnection({
    host:'127.0.0.1',
    user:"root",
    password:"",
    database:"testing_database"
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(50),
    password LONGTEXT,
    created_at VARCHAR(255))`;

Connection.query(createTableQuery, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
    } else {
      console.log('Connected Query results:', results);
    }
  });
module.exports.con = Connection;