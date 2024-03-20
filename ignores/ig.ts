import dotenv from 'dotenv';
dotenv.config();


import knex from 'knex';
const knexInstance = knex({
    client: 'mysql2',
    connection:{
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: 3306
    }
    
})

export default knexInstance;