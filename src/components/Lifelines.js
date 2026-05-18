import useSound from "../hooks/useSound";
import "../styles/Lifelines.css";

function Lifelines({ onFiftyFifty, onSkip, usedFiftyFifty, usedSkip }) {
  const { playClick } = useSound();

  function handleFiftyFifty() {
    if (usedFiftyFifty) return;
    playClick();
    onFiftyFifty();
  }

  function handleSkip() {
    if (usedSkip) return;
    playClick();
    onSkip();
  }

  return (
    <div className="lifelines-row">
      <button
        className={`lifeline-btn ${usedFiftyFifty ? "lifeline-used" : ""}`}
        onClick={handleFiftyFifty}
        disabled={usedFiftyFifty}
        title="Remove 2 wrong answers"
      >
        <span className="lifeline-icon">50/50</span>
        <span className="lifeline-label">
          {usedFiftyFifty ? "Used" : "Remove 2 wrong"}
        </span>
      </button>

      <button
        className={`lifeline-btn ${usedSkip ? "lifeline-used" : ""}`}
        onClick={handleSkip}
        disabled={usedSkip}
        title="Skip this question"
      >
        <span className="lifeline-icon">⏭️</span>
        <span className="lifeline-label">
          {usedSkip ? "Used" : "Skip question"}
        </span>
      </button>
    </div>
  );
}

export default Lifelines;
