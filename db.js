const e = require('express');

const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'djezzy',
    password: ''
  });

 module.exports = pool;