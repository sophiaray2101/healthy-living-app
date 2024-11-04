import express from 'express';
import connection from '../healthy-living.js';

const router = express.Router();

// will do other CRUD operations in future for future improvements

// QUERY [GET all]

router.get('/', async (req, res) => {
    try{
        const data = await connection.promise().query(
            `SELECT * FROM categories;`
        );
        res.status(200).json({ // 200 -> indicates sucessfull request
            message: "Successfully grabbed categories",
            categories: data
        })

    } catch (err) {
        res.status(500).json({
            message: err || "Error getting categories"
        });
    }
});

router.post("/", async (req, res) => {
    try{
        const{name} = req.body;
        const data = await connection.promise().query(
            `insert into categories (name) values (?)`, [name]
        );
        res.status(200).json({ 
            message: "Successfully inserted category",
            categories: data
        });
    } catch (err) {
        res.status(500).json({
            message: err || "Error adding category"
        });
    }
});


export default router;