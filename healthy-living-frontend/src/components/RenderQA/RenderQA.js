import React from "react";
import './RenderQA.css';


function RenderQA({question}){
    return(
        <div className="qa-item">
            <h4>{question.content}</h4>
            {
                question.answer ? <p>{question.answer}</p> :  <p>No answer available</p>
            }
        </div>
    )

}

export default RenderQA;