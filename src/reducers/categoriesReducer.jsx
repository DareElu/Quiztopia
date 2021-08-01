const initialState = {
    quizCategories: {
        trivia_categories: [],
    },
    catIsLoading: true,
    categoriesQuestionCount: {
        category_id: "",
        category_question_count: {
            total_question_count: "",
            total_easy_question_count: "",
            total_medium_question_count: "",
            total_hard_question_count: "",
        },
    },
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
            return {
                ...state,
                quizCategories: action.payload.quizCategories,
                catIsLoading: false,
            };
        case "LOADING_CATEGORIES":
            return { ...state, catIsLoading: true };
        case "FETCH_CATEGORIES_QUESTION_COUNT":
            return {
                ...state,
                categoriesQuestionCount: action.payload.categoriesQuestionCount,
            };
        default:
            return { ...state };
    }
};
