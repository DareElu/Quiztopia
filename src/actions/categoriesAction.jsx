import { generateCategories, categoryQuestionCountLookUpURL } from "../api";

export const categoriesAction = () => async (dispatch) => {
    dispatch({
        type: "LOADING_CATEGORIES",
    });
    const data = await fetch(generateCategories());
    const categories = await data.json();
    dispatch({
        type: "FETCH_CATEGORIES",
        payload: {
            quizCategories: categories,
        },
    });
};

export const categoryQuestionCountAction = (id) => async (dispatch) => {
    const data = await fetch(categoryQuestionCountLookUpURL(id));
    const response = await data.json();
    dispatch({
        type: "FETCH_CATEGORIES_QUESTION_COUNT",
        payload: {
            categoriesQuestionCount: response,
        },
    });
};
