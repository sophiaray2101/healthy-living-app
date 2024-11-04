import express from 'express';
import bcrypt from 'bcrypt'; 
import connection from '../healthy-living.js';

const router = express.Router();

// Only need POST to create new user and POST to log in user (not a GET for more security reasons)

// POST -> create new user
router.post("/register", async (req, res) => {
    try{ 
        const {username, password} = req.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        const data = await connection.promise().query(
            `INSERT INTO user_info (username, password) VALUES (?, ?)`, [username, passwordHash]
        );
        res.status(201).json({
            message: "Successfully registered user",
            affectedRows: data.affectedRows,
            insertID: data.insertID
        });

    } catch (err) {
        console.log("Error occured during registration:", err)
        res.status(500).json({
            message: err || "Error occured while registering user"
        });
    }
});

// POST -> log in user verification
router.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body;

        const [data] = await connection.promise().query(
            `SELECT * FROM user_info WHERE username = ?`, [username]
        );

        // checking if user even exsists
        if (data.length === 0){
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const user = data[0];

        const matched = await bcrypt.compare(password, user.password);

        if (!matched){
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.status(200).json({ // 200 -> correct login
            message: "Login successful",
            username: user.username
        })

    } catch (err) {
        console.log("Error occured during login:", err)
        res.status(500).json({
            message: err || "Error occured while logging in"
        });
    }
});

export default router;