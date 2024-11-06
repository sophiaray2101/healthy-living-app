import React from "react";
import { useEffect, useState } from "react";

import RenderQA from "../RenderQA/RenderQA";
import './QuestionAnswerList.css';

function QuestionAnswerList({selectedCategory}) {
    const [questions, questionSetter] = useState([]);
 
    const handleQuestionsQuery = () => {
        if(!selectedCategory){
            questionSetter([]);
            return;
        }
        let parameters = {
            method: "GET"
        }
        console.log("handleQuestionsQuery called")
        let url = `http://localhost:8000/api/questions/${selectedCategory.category_id}/questions`;
        fetch (url, parameters)
            .then (res => res.json())
            .then (json => {
                console.log("API repsponse:",json );
                if (Array.isArray(json.questions) && json.questions.length > 0) {
                    questionSetter(json.questions);
                } else {
                    console.error("No questions found in response");
                    questionSetter([]); 
                }
            })
            .catch(err => console.error("error fetching questions:", err));
    }

    useEffect(() => {
        handleQuestionsQuery();
    }, [selectedCategory]);


    if(!selectedCategory)
        return <div>Please select a category to view questions and answers</div>

    return (
        <div className="question-answer-container">
            <h3>Questions and Answers for category {selectedCategory.name}</h3>
            <ul className="question-answer-list">
                {questions.map(question => (
                   <RenderQA key={question.question_id} question={question}/>
                ))}
            </ul>
        </div>
    )
}

export default QuestionAnswerList;