import React, { useState } from "react";
import "../QuestionAnswer.css"

const QuestionAnswer = () => {
    const [context, setContext] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    const getAnswer = () => {
        if (question == "" || context == "") {
            setError(true);
            return;
        }

        let data = {
            inputs:
            {
                question: question,
                context: context
            }
        }

        fetch("https://api-inference.huggingface.co/models/deepset/roberta-base-squad2", {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.Error);
                }

                return (response.json());
            })
            .then(result => {
                (result != undefined && result != "" && result.answer != undefined && result.answer != "") ? setAnswer(result.answer) : setAnswer("");
            })
        setError(false);
    }

    const clearAll = () => {
        setError(false);
        setContext("");
        setQuestion("");
        setAnswer("");
    }

    const contextChange = (newValue) => {
        setContext(newValue);
    }

    return (<div class="QA-content">
        <h4>Context:<span className="requiredField">*</span></h4>
        <textarea className={(error && context == "") ? "requiredText" : ""} rows={15} placeholder='Enter context here' value={context} onChange={e => contextChange(e.target.value)} required />
        <h4>Question:<span className="requiredField">*</span></h4>
        <textarea className={error && question == "" ? "requiredText" : ""} rows={3} placeholder='Ask Question here' value={question} onChange={e => setQuestion(e.target.value)} />
        {error ? <span className="errorMessage">Please fill the required fields</span> : <></>}
        <button onClick={e => getAnswer()}>Get Answer</button>
        <button onClick={e => clearAll()}>Clear All</button>
        <h4>Answer:</h4>
        <textarea rows={3} value={answer} disabled />
    </div>
    );
};

export default QuestionAnswer;