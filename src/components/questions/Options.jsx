function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  const classTypeOption = (index) => {
    return index === question.correctOption ? "correct" : "wrong";
  };
  return (
    <div className="options">
      {question.options.map((o, i) => {
        return (
          <button
            key={i}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            className={`btn btn-option ${i === answer ? "answer" : ""} 
             ${hasAnswered ? classTypeOption(i) : ""}`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
