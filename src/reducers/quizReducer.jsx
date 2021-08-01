const initState = {
    generatedQuiz: {
        results: [
            {
                correct_answer: "",
                incorrect_answers: [],
            },
        ],
        isLoading: true,
    },
};

export const quizReducer = (state = initState, action) => {
    switch (action.type) {
        case "GENERATE_QUIZ":
            return {
                ...state,
                generatedQuiz: action.payload.generatedQuiz,
                isLoading: false,
            };
        case "LOADING_QUIZ":
            return { ...state, isLoading: true };
        default:
            return { ...state };
    }
};
