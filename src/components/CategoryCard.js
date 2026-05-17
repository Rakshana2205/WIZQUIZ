import "../styles/CategoryCard.css";

function CategoryCard({
  emoji,
  title,
  questionCount,
  color,
  onClick,
  highScore,
  onPlaySound,
}) {
  function handleClick() {
    if (onPlaySound) onPlaySound();
    onClick();
  }

  return (
    <div
      className="category-card"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <span className="category-emoji">{emoji}</span>
      <h3 className="category-title">{title}</h3>
      <p className="category-count">{questionCount} questions</p>
      {highScore && (
        <div className="category-highscore">
          🏆 Best: {highScore.percentage}%
        </div>
      )}
      <button className="category-btn">
        {highScore ? "Play Again! 🔄" : "Play Now! ✨"}
      </button>
    </div>
  );
}

export default CategoryCard;
