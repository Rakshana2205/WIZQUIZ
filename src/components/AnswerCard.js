import "../styles/AnswerCard.css";

function AnswerCard({
  option,
  color,
  isAnswered,
  isCorrect,
  isSelected,
  onClick,
}) {
  function getCardStyle() {
    if (!isAnswered) return { backgroundColor: color };
    if (isCorrect)
      return { backgroundColor: "#B2F2BB", border: "3px solid #2F9E44" };
    if (isSelected)
      return { backgroundColor: "#FFA8A8", border: "3px solid #C92A2A" };
    return { backgroundColor: "#E9ECEF", opacity: 0.6 };
  }

  function getIcon() {
    if (!isAnswered) return null;
    if (isCorrect) return "✅";
    if (isSelected) return "❌";
    return null;
  }

  return (
    <div
      className={`answer-card ${isAnswered ? "answered" : "hoverable"}`}
      style={getCardStyle()}
      onClick={!isAnswered ? onClick : null}
    >
      <span className="answer-icon">{getIcon()}</span>
      <span className="answer-text">{option}</span>
    </div>
  );
}

export default AnswerCard;
