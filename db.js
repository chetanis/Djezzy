const e = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'djezzy',
    port: '3306',
    user: 'root',
    password: '',
});

connection.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('Connection established');
    }
});

module.exports = connection;