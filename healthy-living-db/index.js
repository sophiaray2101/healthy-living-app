import express from 'express';
import cors from 'cors';

import userInfo from './routers/user_info.js';
import categories from './routers/categories.js';
import questions from './routers/questions.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user_info", userInfo);
app.use("/api/categories", categories);
app.use("/api/questions", questions);

app.get('/', (req,res) => {
    res.send("Login Page");
});

app.listen(8000, () => {
    console.log("Listening at port 8000...");
});