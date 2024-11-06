import express from 'express';
import connection from '../healthy-living.js';

const router = express.Router();

// will do other CRUD operations in future for future improvements

// QUERY [GET all questions per category]

router.get('/:category_id/questions', async (req, res) => {
    try{
        const {category_id} = req.params;
        const [data] = await connection.promise().query(
            `SELECT question_id, content, answer FROM questions WHERE category_id=?`, [category_id]
        );
        console.log("question data", data)
        res.status(200).json({ // 200 -> indicates sucessfull request
            message: "Successfully grabbed questions for category",
            questions: data
        })

    } catch (err) {
        res.status(500).json({
            message: err || "Error getting questions"
        });
    }
});

// POST (insert questions into category)
router.post('/:category_id/questions', async (req, res) => {
    try{
        const {category_id} = req.params;
        const {content, answer} = req.body
        const [data] = await connection.promise().query(
            `insert into questions (category_id, content, answer) values (?,?,?)`, [category_id, content, answer]
        );
        res.status(201).json({ 
            message: "Successfully inserted question into category",
            questions: data
        });
    } catch (err) {
        res.status(500).json({
            message: err || "Error adding question"
        });
    }
});



export default router;