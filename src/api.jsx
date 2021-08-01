const baseURL = "https://opentdb.com/api.php?";

export const generateQuizURL = (
    category = 9,
    difficulty = "easy",
    amount = 10
) => `${baseURL}amount=${amount}&category=${category}&difficulty=${difficulty}`;

export const generateCategories = () => `https://opentdb.com/api_category.php`;

export const categoryQuestionCountLookUpURL = (id) =>
    `https://opentdb.com/api_count.php?category=${id}`;
