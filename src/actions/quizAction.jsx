import { generateQuizURL } from "../api";

export const quizAction =
    (category = 9, difficulty = "easy", amount = 10) =>
    async (dispatch) => {
        dispatch({
            type: "LOADING_QUIZ",
        });

        const data = await fetch(generateQuizURL(category, difficulty, amount));
        const response = await data.json();

        dispatch({
            type: "GENERATE_QUIZ",
            payload: {
                generatedQuiz: response,
            },
        });
    };
