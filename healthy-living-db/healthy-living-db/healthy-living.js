import express from 'express'
import mysql from 'mysql2'

const router = express.Router()

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gabriella1',
    database: 'healthy_living'
})

export default router;