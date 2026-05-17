import Confetti from "../components/Confetti";
import useSound from "../hooks/useSound";
import "../styles/ResultsPage.css";

function ResultsPage({ result, onPlayAgain, onHome }) {
  const { score, total, category, answers } = result;
  const { playPlayAgain, playBack } = useSound();
  const percentage = Math.round((score / total) * 100);
  const isPerfect = percentage === 100;

  function getRank() {
    if (percentage === 100)
      return { emoji: "🏆", msg: "Perfect Score! You're a true wizard!" };
    if (percentage >= 80)
      return { emoji: "🧙", msg: "Amazing! You're almost a wizard!" };
    if (percentage >= 60)
      return { emoji: "⭐", msg: "Great job! Keep practising!" };
    if (percentage >= 40)
      return { emoji: "📚", msg: "Good effort! You're learning!" };
    return { emoji: "💪", msg: "Keep going! Every wizard starts somewhere!" };
  }

  const { emoji, msg } = getRank();

  function handlePlayAgain() {
    playPlayAgain();
    onPlayAgain();
  }

  function handleHome() {
    playBack();
    onHome();
  }

  return (
    <div className="results-wrapper">
      <Confetti show={isPerfect} />
      <div className="results-page">
        <div className="result-hero">
          <div className="result-emoji">{emoji}</div>
          <h1 className="result-title">Quiz Complete!</h1>
          <p className="result-message">{msg}</p>
        </div>

        <div className="score-card">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-divider">of</span>
            <span className="score-total">{total}</span>
          </div>
          <div className="score-details">
            <p className="score-category">{category} Quiz</p>
            <p className="score-percentage">{percentage}% correct</p>
            <div className="score-bar-wrapper">
              <div
                className="score-bar-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="breakdown-section">
          <h3 className="breakdown-title">📋 Question Breakdown</h3>
          {answers.map((a, i) => (
            <div
              key={i}
              className={`breakdown-item ${
                a.isCorrect ? "breakdown-correct" : "breakdown-wrong"
              }`}
            >
              <span className="breakdown-icon">
                {a.isCorrect ? "✅" : "❌"}
              </span>
              <div className="breakdown-info">
                <p className="breakdown-question">{a.question}</p>
                <p className="breakdown-answer">
                  {a.isCorrect
                    ? `Your answer: ${a.selected}`
                    : `Your answer: ${a.selected || "No answer"} → Correct: ${a.correct}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="result-buttons">
          <button className="btn-play-again" onClick={handlePlayAgain}>
            🔄 Play Again
          </button>
          <button className="btn-home" onClick={handleHome}>
            🏠 Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
