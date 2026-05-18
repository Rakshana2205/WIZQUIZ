import CategoryCard from "../components/CategoryCard";
import "../styles/HomePage.css";
import questions from "../data/questions";
import useSound from "../hooks/useSound";

const CATEGORIES = [
  { title: "Science", emoji: "🔬", color: "#74C0FC" },
  { title: "Geography", emoji: "🌍", color: "#B2F2BB" },
  { title: "Maths", emoji: "🔢", color: "#FFD43B" },
  { title: "History", emoji: "📜", color: "#FFA8A8" },
  { title: "Movies", emoji: "🎬", color: "#E9BCFF" },
];

function HomePage({ onSelectCategory, highScores, onDailyChallenge, player }) {
  const { playStart } = useSound();

  function getQuestionCount(categoryTitle) {
    return questions.filter((q) => q.category === categoryTitle).length;
  }

  return (
    <div className="home-wrapper">
      <div className="home-page">
        <div className="home-header">
          <div className="wiz-logo">🧙</div>
          <h1 className="home-title">WizQuiz</h1>
          <p className="home-subtitle">
            Test your knowledge across 5 magical categories!
          </p>
          <div className="home-stats">
            {player && (
              <div className="player-welcome">
                <span>{player.avatar}</span>
                <span>Welcome back, {player.name}!</span>
              </div>
            )}
            <span className="stat-pill">🧠 {questions.length} Questions</span>
            <span className="stat-pill">🏆 5 Categories</span>
            <span className="stat-pill">⚡ Beat your best!</span>
          </div>
        </div>

        <h2 className="section-title">Choose your category</h2>

        <div className="categories-grid">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              emoji={cat.emoji}
              title={cat.title}
              questionCount={getQuestionCount(cat.title)}
              color={cat.color}
              highScore={highScores ? highScores[cat.title] : null}
              onPlaySound={playStart}
              onClick={() => onSelectCategory(cat.title)}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        <div className="daily-challenge-banner" onClick={onDailyChallenge}>
          <div className="daily-challenge-left">
            <span className="daily-challenge-emoji">📅</span>
            <div>
              <p className="daily-challenge-title">Daily Challenge</p>
              <p className="daily-challenge-sub">
                10 mixed questions — resets every day!
              </p>
            </div>
          </div>
          <button className="daily-challenge-btn">Play Now! ⚡</button>
        </div>

        <div className="home-footer">
          <p>🧙 Choose wisely, young wizard — your quest begins now!</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
