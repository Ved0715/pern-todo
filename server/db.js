const Pool = require('pg').Pool ;
require('dotenv').config();



const pool = new Pool({
    user: process.env.USER_ID,
    password: process.env.USER_PASSWORD,
    host: process.env.HOST,
    post: process.env.POST,
    database: process.env.DATABASE
})


module.exports = pool;


