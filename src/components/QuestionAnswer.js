import React, { useState } from "react";
import "../QuestionAnswer.css"

// Question Answer component
const QuestionAnswer = () => {
    // Declarig states for each field
    const [context, setContext] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    // Get answer button click
    const getAnswer = () => {
        // Display error if question or context is empty
        if (question == "" || context == "") {
            setError(true);
            return;
        }

        // Json object with inputs for API call
        let data = {
            inputs:
            {
                question: question,
                context: context
            }
        }

        // Calling hugggingface model to do AI operation to get the answer based on context and question
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
                // Display answer if available
                (result != undefined && result != "" && result.answer != undefined && result.answer != "") ? setAnswer(result.answer) : setAnswer("");
            })
        setError(false);
    }

    // Clear all button click 
    const clearAll = () => {
        //Clear all the fields
        setError(false);
        setContext("");
        setQuestion("");
        setAnswer("");
    }

    // On context text field change
    const contextChange = (newValue) => {
        setContext(newValue);
    }

    return (<div class="QA-content">
        <h4>Context:<span className="requiredField">*</span></h4>
        <textarea className={(error && context == "") ? "requiredText" : ""} rows={15} placeholder='Enter context here' value={context} onChange={e => contextChange(e.target.value)} required />
        <h4>Question:<span className="requiredField">*</span></h4>
        <textarea className={error && question == "" ? "requiredText" : ""} rows={3} placeholder='Ask Question here' value={question} onChange={e => setQuestion(e.target.value)} />
        {/* Display error message if validation failed */}
        {error ? <span className="errorMessage">Please fill the required fields</span> : <></>}
        <button onClick={e => getAnswer()}>Get Answer</button>
        <button onClick={e => clearAll()}>Clear All</button>
        <h4>Answer:</h4>
        <textarea rows={3} value={answer} readonly />
    </div>
    );
};

export default QuestionAnswer;
