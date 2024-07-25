import { useEffect } from "react";
import Header from "./components/ui/Header";
import Main from "./components/layout/Main";
import Loader from "./components/ui/Loader";
import Error from "./components/ui/Error";
import { useReducer } from "react";
import StartScreen from "./components/layout/StartScreen";
import Question from "./components/questions/Question";
import ProgressBar from "./components/layout/ProgressBar";
import FinishScreen from "./components/layout/FinishScreen";
import Footer from "./components/layout/Footer";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  heighScore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "setQuestions":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECONDS_PER_QUESTION * state.questions.length,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        heighScore:
          state.points > state.heighScore ? state.points : state.heighScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function App() {
  const [
    { status, questions, index, answer, points, heighScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsQuantity = questions.length;
  const sumPoints = questions.reduce(
    (sum, question) => sum + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "setQuestions", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questionsQuantity} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numQuestions={questionsQuantity}
              points={points}
              index={index}
              sumPoints={sumPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <Footer
              answer={answer}
              index={index}
              numQuestions={questionsQuantity}
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}
            ></Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            heighScore={heighScore}
            points={points}
            sumPoints={sumPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
