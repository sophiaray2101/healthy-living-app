import express from 'express';
import connection from '../healthy-living.js';

const router = express.Router();

// will do other CRUD operations in future for future improvements

// QUERY [GET by question ID]

router.get('/:question_id/answers', async (req, res) => {
    try{
        const {question_id} = req.params;
        const data = await connection.promise().query(
            `SELECT answer_id, content FROM answers WHERE question_id=?`, [question_id]
        );
        res.status(200).json({ // 200 -> indicates sucessfull request
            message: "Successfully grabbed answer for question",
            answers: data
        })

    } catch (err) {
        res.status(500).json({
            message: err || "Error getting answers"
        });
    }
});

// POST (insert questions into category)
router.post('/:question_id/answers', async (req, res) => {
    try{
        const {question_id} = req.params;
        const {content} = req.body
        const data = await connection.promise().query(
            `insert into answers (question_id, content) values (?,?)`, [question_id, content]
        );
        res.status(201).json({ 
            message: "Successfully inserted answer for question",
            questions: data
        });
    } catch (err) {
        res.status(500).json({
            message: err || "Error adding answer"
        });
    }
});



export default router;