import React, { useState, createContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const QuizzContext = createContext();

export const QuizzProvider = (props) => {
    const [question, setQuestion] = useState(0);
    const quiz = useSelector((state) => state.quiz.generatedQuiz.results);
    const correctAns = quiz[question].correct_answer;
    const incorrectAns = quiz[question].incorrect_answers;
    const allAnswers = [...incorrectAns, correctAns];
    const [checkIfNullAnswer, setCheckIfNullAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);
    const [resultsHistory, setResultsHistory] = useState([]);

    return (
        <QuizzContext.Provider
            value={{
                question: [question, setQuestion],
                quiz: quiz,
                correctAns: correctAns,
                allAnswers: allAnswers,
                checkIfNullAnswer: [checkIfNullAnswer, setCheckIfNullAnswer],
                userAnswer: [userAnswer, setUserAnswer],
                questions: [questions, setQuestions],
                results: [results, setResults],
                resultsHistory: [resultsHistory, setResultsHistory],
            }}
        >
            {props.children}
        </QuizzContext.Provider>
    );
};
