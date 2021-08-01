import { combineReducers } from "redux";
import { quizReducer } from "./quizReducer";
import { categoriesReducer } from "./categoriesReducer";

const allReducers = combineReducers({
    quiz: quizReducer,
    categories: categoriesReducer,
});

export default allReducers;
