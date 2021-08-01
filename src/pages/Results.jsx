import React, { useContext } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { QuizzContext } from "../context/QuizzContext";
import { motion } from "framer-motion";
import { pageAnimation, fadeIn, sliderContainer, slider } from "../animation";

const Results = () => {
    const {
        resultsHistory: [resultsHistory, setResultsHistory],
    } = useContext(QuizzContext);

    const buttonColourHandler = (option, result) => {
        if (option === result.correctAns) {
            return "success";
        } else if (
            option === result.usersAnswer &&
            option !== result.correctAns
        ) {
            return "danger";
        } else {
            return "secondary";
        }
    };
    const displayMsgHandler = (result) => {
        if (result.usersAnswer === result.correctAns) {
            return `Well done!! the correct answer is ${result.correctAns}`;
        } else {
            return `The correct answer is ${result.correctAns}`;
        }
    };

    const getScore = () => {
        let total = 0;
        resultsHistory.forEach((result) => {
            if (result.usersAnswer === result.correctAns) {
                total += 1;
            }
        });
        return total;
    };

    return (
        <motion.div variants={pageAnimation} initial="start" animate="end">
            <motion.div variants={sliderContainer}>
                <motion.div variants={slider} className="frame1"></motion.div>
                <motion.div variants={slider} className="frame2"></motion.div>
                <motion.div variants={slider} className="frame3"></motion.div>
                <motion.div variants={slider} className="frame4"></motion.div>
            </motion.div>

            <h4 className="results-score">
                Your Score:
                <br />
                <Badge bg="success" className="badge">
                    <h2>
                        {Math.round(
                            (getScore() / resultsHistory.length) * 100 * 100
                        ) / 100}
                        %
                    </h2>
                </Badge>
            </h4>

            <motion.div variants={fadeIn} className="main">
                {resultsHistory.map((result, ind) => {
                    return (
                        <Card key={ind} className="home-form">
                            <Card.Header>
                                {result.question
                                    .replaceAll(/&quot;/g, '"')
                                    .replaceAll(/&shy;/g, "-")
                                    .replaceAll(/&#039;/g, "'")
                                    .replaceAll(/&Prime;/g, "'")
                                    .replaceAll(/&rsquo;/g, "'")}
                            </Card.Header>
                            <Card.Body key={ind}>
                                <div className="d-grid gap-2">
                                    {result.options.map((option, index) => (
                                        <Button
                                            value={option}
                                            key={index}
                                            variant={buttonColourHandler(
                                                option,
                                                result
                                            )}
                                            size="sm"
                                            disabled
                                        >
                                            {option
                                                .replaceAll(/&quot;/g, '"')
                                                .replaceAll(/&shy;/g, "-")
                                                .replaceAll(/&#039;/g, "'")
                                                .replaceAll(/&Prime;/g, "'")
                                                .replaceAll(/&rsquo;/g, "'")}
                                        </Button>
                                    ))}
                                </div>
                            </Card.Body>
                            <Card.Footer className="text-muted generated_quiz-results">
                                {displayMsgHandler(result)}
                            </Card.Footer>
                        </Card>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default Results;
