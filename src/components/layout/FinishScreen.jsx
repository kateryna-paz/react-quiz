function FinishScreen({ points, sumPoints, heighScore, dispatch }) {
  const percentage = (points / sumPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🤩";
  if (percentage >= 80) emoji = "😎";
  if (percentage >= 50) emoji = "👍";
  if (percentage >= 20) emoji = "🙂";
  if (percentage === 0) emoji = "😐";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {sumPoints} ({Math.ceil(percentage)}%)
      </p>
          <p className="highscore">(Highscore: {heighScore} points)</p>
          <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})} >Restart Quiz</button>
    </>
  );
}

export default FinishScreen;
