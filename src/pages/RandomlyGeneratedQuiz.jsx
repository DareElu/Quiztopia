import React, { useEffect, useContext } from "react";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, fadeIn, sliderContainer, slider } from "../animation";
import { useSelector } from "react-redux";
import { Button, Card, Alert } from "react-bootstrap";
import { IoCheckbox } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import { useHistory } from "react-router";
import { QuizzContext } from "../context/QuizzContext";

const RandomlyGeneratedQuiz = () => {
    const history = useHistory();
    const {
        question: [question, setQuestion],
        quiz: quiz,
        correctAns: correctAns,
        allAnswers: allAnswers,
        checkIfNullAnswer: [checkIfNullAnswer, setCheckIfNullAnswer],
        userAnswer: [userAnswer, setUserAnswer],
        questions: [questions, setQuestions],
        results: [results, setResults],
        resultsHistory: [resultsHistory, setResultsHistory],
    } = useContext(QuizzContext);

    const { isLoading } = useSelector((state) => state.quiz.generatedQuiz);

    const shuffle = (array) => {
        let currentIndex = array.length;
        let randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    const handleUserSelectedAnswer = (e) => {
        e.preventDefault();
        setUserAnswer(e.target.value);
    };

    const handleSubmitedAnswer = async (e, selectedAnswer) => {
        e.preventDefault();
        if (selectedAnswer !== "") {
            if (e.target.value != "Results") {
                await setResultsHistory((res) => [
                    ...res,
                    {
                        question: quiz[question].question,
                        options: questions,
                        usersAnswer: selectedAnswer,
                        correctAns: correctAns,
                    },
                ]);
                setQuestion((prev) => prev + 1);
                if (userAnswer === (await correctAns)) {
                    setResults((res) => [
                        ...res,
                        ,
                        <IconContext.Provider value={{ color: "green" }}>
                            <IoCheckbox />
                        </IconContext.Provider>,
                    ]);
                } else {
                    setResults((res) => [
                        ...res,
                        <IconContext.Provider
                            value={{
                                color: "rgb(143, 36, 36)",
                                size: "20px",
                            }}
                        >
                            <ImCross />
                        </IconContext.Provider>,
                    ]);
                }
            } else if (e.target.value === "Results") {
                await setResultsHistory((res) => [
                    ...res,
                    {
                        question: quiz[question].question,
                        options: questions,
                        usersAnswer: selectedAnswer,
                        correctAns: correctAns,
                    },
                ]);
                history.push("/quiz/results");
            }
            setUserAnswer("");
        } else if (selectedAnswer === "") {
            setCheckIfNullAnswer(true);
            setInterval(() => {
                setCheckIfNullAnswer(false);
            }, 2000);
        }
    };

    useEffect(() => {
        const shuffledQuestions = shuffle(allAnswers);
        setQuestions(shuffledQuestions);
    }, [quiz, question]);

    useEffect(() => {
        setQuestion(0);
        setResults([]);
        setResultsHistory([]);
    }, []);

    return (
        <>
            {!isLoading && (
                <motion.div
                    variants={pageAnimation}
                    initial="start"
                    animate="end"
                >
                    <motion.div variants={sliderContainer}>
                        <motion.div
                            variants={slider}
                            className="frame1"
                        ></motion.div>
                        <motion.div
                            variants={slider}
                            className="frame2"
                        ></motion.div>
                        <motion.div
                            variants={slider}
                            className="frame3"
                        ></motion.div>
                        <motion.div
                            variants={slider}
                            className="frame4"
                        ></motion.div>
                    </motion.div>

                    <motion.div variants={fadeIn} className="main">
                        <Card className="home-form">
                            <Card.Header>
                                <span>
                                    <i>{quiz[question].category}</i> - Question
                                    {` ${question + 1}`} of {quiz.length}:
                                    <br></br>
                                </span>
                                <b>
                                    {quiz[question].question
                                        .replaceAll(/&quot;/g, '"')
                                        .replaceAll(/&shy;/g, "-")
                                        .replaceAll(/&#039;/g, "'")}
                                </b>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-grid gap-2">
                                    {checkIfNullAnswer && (
                                        <Alert variant="danger">
                                            please select an answer to continue
                                        </Alert>
                                    )}
                                    {questions &&
                                        questions.map((quest, index) => {
                                            return (
                                                <Button
                                                    value={quest}
                                                    key={index}
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={
                                                        handleUserSelectedAnswer
                                                    }
                                                >
                                                    {quest
                                                        .replaceAll(
                                                            /&quot;/g,
                                                            '"'
                                                        )
                                                        .replaceAll(
                                                            /&#039;/g,
                                                            "'"
                                                        )}
                                                </Button>
                                            );
                                        })}
                                </div>
                                <Button
                                    onClick={(e) =>
                                        handleSubmitedAnswer(e, userAnswer)
                                    }
                                    value={
                                        question < quiz.length - 1
                                            ? "Submit"
                                            : "Results"
                                    }
                                    className={`quiz-btn ${
                                        question < quiz.length - 1
                                            ? ""
                                            : "results-btn"
                                    }`}
                                    variant={
                                        question < quiz.length - 1
                                            ? "primary"
                                            : "success"
                                    }
                                >
                                    {question < 9 ? "Submit" : "Results"}
                                </Button>
                            </Card.Body>
                            <Card.Footer className="text-muted generated_quiz-results">
                                {results.map((result, index) => (
                                    <h2
                                        key={index}
                                        className="generated_quiz-result"
                                    >
                                        {result}
                                    </h2>
                                ))}
                            </Card.Footer>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default RandomlyGeneratedQuiz;
