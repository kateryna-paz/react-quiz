import NextButton from "../questions/NextButton";
import Timer from "../questions/Timer";

function Footer({ answer, index, numQuestions, dispatch, secondsRemaining }) {
  return (
    <div className="footer">
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        answer={answer}
        index={index}
        numQuestions={numQuestions}
        dispatch={dispatch}
      ></NextButton>
    </div>
  );
}

export default Footer;
