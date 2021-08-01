import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { quizAction } from "../actions/quizAction";
import {
    categoriesAction,
    categoryQuestionCountAction,
} from "../actions/categoriesAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
//Animation
import { motion } from "framer-motion";
import { pageAnimation, slider, sliderContainer, fadeIn } from "../animation";

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoriesAction());
    }, [dispatch]);

    const { quizCategories } = useSelector((state) => state.categories);

    const [quizCriteria, setQuizCriteria] = useState({
        category: 9,
        difficulty: "easy",
        amount: 10,
    });
    const [maxQuestions, setMaxQuestions] = useState(10);
    const [inputRange, setInputRange] = useState(10);

    const dispatchCategoryQuestionCountActionHandler = (value) => {
        return new Promise(async (resolve) => {
            dispatch(categoryQuestionCountAction(value));
            const data = await fetch(
                `https://opentdb.com/api_count.php?category=${value}`
            );

            const response = await data.json();

            resolve(await response);
        });
    };

    const selectCategoryHandler = (e) => {
        setQuizCriteria((criteria) => ({
            ...criteria,
            category: e.target.value,
        }));

        dispatchCategoryQuestionCountActionHandler(e.target.value)
            .then((response) => {
                if (
                    quizCriteria.difficulty === "easy" &&
                    response.category_question_count.total_easy_question_count <
                        10
                ) {
                    return response.category_question_count
                        .total_easy_question_count;
                } else if (
                    quizCriteria.difficulty === "medium" &&
                    response.category_question_count
                        .total_medium_question_count < 10
                ) {
                    return response.category_question_count
                        .total_medium_question_count;
                } else if (
                    quizCriteria.difficulty === "hard" &&
                    response.category_question_count.total_hard_question_count <
                        10
                ) {
                    return response.category_question_count
                        .total_hard_question_count;
                } else {
                    return 10;
                }
            })
            .then(async (amount) => {
                setMaxQuestions(amount);
                if (amount < inputRange) {
                    setQuizCriteria((prev) => ({ ...prev, amount: amount }));
                }
            });
    };

    const selectDifficultyHandler = (e) => {
        setQuizCriteria((criteria) => ({
            ...criteria,
            difficulty: e.target.value,
        }));
    };

    const generateQuizHandler = (e) => {
        e.preventDefault();
        dispatch(
            quizAction(
                quizCriteria.category,
                quizCriteria.difficulty,
                quizCriteria.amount
            )
        );
        history.push("/quiz");
    };

    const inputRangeHandler = (e) => {
        setQuizCriteria((prev) => ({ ...prev, amount: e.target.value }));
        setInputRange(e.target.value);
    };

    return (
        <motion.main variants={pageAnimation} initial="start" animate="end">
            <motion.div variants={sliderContainer}>
                <motion.div variants={slider} className="frame1"></motion.div>
                <motion.div variants={slider} className="frame2"></motion.div>
                <motion.div variants={slider} className="frame3"></motion.div>
                <motion.div variants={slider} className="frame4"></motion.div>
            </motion.div>
            <motion.div variants={fadeIn} className="home-form">
                <Form onSubmit={generateQuizHandler}>
                    <Form.Group className="mb-3" controlId="QuizDifficulty">
                        <Form.Label>Select Category:</Form.Label>
                        <Form.Select onChange={selectCategoryHandler}>
                            {quizCategories.trivia_categories.map(
                                (category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                }
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="QuizCategory">
                        <Form.Label>Select Difficulty:</Form.Label>
                        <Form.Select onChange={selectDifficultyHandler}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="QuestionCount">
                        <Form.Label>Questions: {inputRange}</Form.Label>
                        <Form.Range
                            min={1}
                            max={maxQuestions}
                            value={inputRange}
                            onChange={inputRangeHandler}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Generate Quiz
                        </Button>
                    </div>
                </Form>
            </motion.div>
        </motion.main>
    );
};

export default Home;
