import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { GiBrain } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
//REDUX
import { quizAction } from "../actions/quizAction";
import { categoryQuestionCountAction } from "../actions/categoriesAction";
import { useDispatch, useSelector } from "react-redux";

const Navigation = ({ setIntroState }) => {
    const location = useLocation();
    const path = location.pathname;

    const { quizCategories } = useSelector((state) => state.categories);

    const history = useHistory();
    const dispatch = useDispatch();

    const dispatchRandomCategoryQuestionCountHandler = () => {
        return new Promise(async (resolve) => {
            const randomCat = await quizCategories.trivia_categories[
                Math.floor(
                    Math.random() *
                        (await quizCategories.trivia_categories.length)
                )
            ];

            dispatch(categoryQuestionCountAction(await randomCat.id));
            const data = await fetch(
                `https://opentdb.com/api_count.php?category=${await randomCat.id}`
            );

            const response = await data.json();

            resolve(await response);
        });
    };

    const generateRandomQuizHandler = (e) => {
        e.preventDefault();

        dispatchRandomCategoryQuestionCountHandler().then((randomCategory) => {
            const diffultyOptions = ["easy", "medium", "hard"];
            const randomDifficulty =
                diffultyOptions[
                    Math.floor(Math.random() * diffultyOptions.length)
                ];

            dispatch(
                quizAction(
                    randomCategory.category_id,
                    randomDifficulty,
                    setCategoryQuestionCount(randomCategory, randomDifficulty)
                )
            );

            history.push("/quiz/random");
        });
    };

    const setCategoryQuestionCount = (response, difficulty) => {
        if (
            difficulty === "easy" &&
            response.category_question_count.total_easy_question_count < 10
        ) {
            return response.category_question_count.total_easy_question_count;
        } else if (
            difficulty === "medium" &&
            response.category_question_count.total_medium_question_count < 10
        ) {
            return response.category_question_count.total_medium_question_count;
        } else if (
            difficulty === "hard" &&
            response.category_question_count.total_hard_question_count < 10
        ) {
            return response.category_question_count.total_hard_question_count;
        } else {
            return 10;
        }
    };

    return (
        <Container>
            <Nav
                justify
                variant="tabs"
                defaultActiveKey="/"
                className="justify-content-center"
            >
                <Navbar.Brand href="/" className="logo">
                    <GiBrain />
                    Quiztopia
                </Navbar.Brand>
                <Nav.Item>
                    <Nav.Link
                        active={path === "/" ? true : false}
                        href="/"
                        className="nav-home"
                    >
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={path === "/quiz/random" ? true : false}
                        eventKey="link-1"
                        href="/quiz/random"
                        onClick={generateRandomQuizHandler}
                        className="nav-random-quiz"
                    >
                        Random Quiz
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setIntroState((state) => !state)}>
                    <Nav.Link
                        active={path === "/tour-project" ? true : false}
                        eventKey="link-2"
                    >
                        Tour Project
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
    );
};

export default Navigation;
