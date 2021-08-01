import React, { useState } from "react";
//PAGES
import Home from "./pages/Home";
import GeneratedQuiz from "./pages/GeneratedQuiz";
import RandomlyGeneratedQuiz from "./pages/RandomlyGeneratedQuiz";
import Results from "./pages/Results";
//COMPONENTS
import Nav from "./components/Nav";
//STYLES
import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
//ROUTER
import { Route, Switch } from "react-router-dom";
//ANIMATION
import { AnimatePresence } from "framer-motion";
//CONTEXT
import { QuizzProvider } from "./context/QuizzContext";
//INTRO JS
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

function App() {
    const [introState, setIntroState] = useState(false);
    const introJs = {
        stepsEnabled: introState,
        initialStep: 0,
        steps: [
            {
                element: ".navbar-brand",
                intro: "This project was created primarily using ReactJS, redux, bootstrap, sass and the open trivia api.",
            },
            {
                element: ".nav-home",
                intro: "Choose a topic a difficulty, and the amount of questions to generate your own quiz, when you have answered all the questions a results page will be generated that shows you your score and the correct answers",
            },
            {
                element: ".nav-random-quiz",
                intro: "You can also generate a random quiz. When you have answered all the questions a results page will be generated that shows you your score and the correct answers",
            },
        ],
    };
    const handleIntroExit = () => {
        setIntroState(false);
    };
    return (
        <QuizzProvider>
            <Steps
                enabled={introJs.stepsEnabled}
                steps={introJs.steps}
                initialStep={introJs.initialStep}
                onExit={handleIntroExit}
            />
            <div>
                <Nav setIntroState={setIntroState} />
                <AnimatePresence>
                    <Switch>
                        <Route path={["/", "/tour-project"]} exact>
                            <Home />
                        </Route>
                        <Route path="/quiz" exact>
                            <GeneratedQuiz />
                        </Route>
                        <Route path="/quiz/random" exact>
                            <RandomlyGeneratedQuiz />
                        </Route>
                        <Route path="/quiz/results" exact>
                            <Results />
                        </Route>
                    </Switch>
                </AnimatePresence>
            </div>
        </QuizzProvider>
    );
}

export default App;
