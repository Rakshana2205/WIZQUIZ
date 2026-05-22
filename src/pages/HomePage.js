import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import DifficultySelector from "../components/DifficultySelector";
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

const DEFAULT_DIFFICULTY = { id: "medium", time: 15, questions: 10 };

function HomePage({ onSelectCategory, highScores, onDailyChallenge, player }) {
  const { playStart, playClick } = useSound();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);

  function getQuestionCount(categoryTitle) {
    return questions.filter((q) => q.category === categoryTitle).length;
  }

  function handleCategoryClick(cat) {
    playClick();
    setSelectedCategory(cat);
    setDifficulty(DEFAULT_DIFFICULTY);
  }

  function handleStartQuiz() {
    playStart();
    onSelectCategory(selectedCategory.title, difficulty);
  }

  function handleBack() {
    playClick();
    setSelectedCategory(null);
  }

  return (
    <div className="home-wrapper">
      <div className="home-page">
        {/* MAIN HOME VIEW */}
        {!selectedCategory && (
          <>
            <div className="home-header">
              <div className="wiz-logo">🧙</div>
              <h1 className="home-title">WizQuiz</h1>
              <p className="home-subtitle">
                Test your knowledge across 5 magical categories!
              </p>
              <div className="home-stats">
                <span className="stat-pill">
                  🧠 {questions.length} Questions
                </span>
                <span className="stat-pill">🏆 5 Categories</span>
                <span className="stat-pill">⚡ Beat your best!</span>
              </div>
              {player && (
                <div className="player-welcome">
                  <span>{player.avatar}</span>
                  <span>Welcome back, {player.name}!</span>
                </div>
              )}
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

            <h2 className="section-title">Choose your category</h2>

            <div className="categories-grid">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.title}
                  emoji={cat.emoji}
                  title={cat.title}
                  questionCount={getQuestionCount(cat.title)}
                  color={cat.color}
                  highScore={highScores ? highScores[cat.title] : null}
                  onPlaySound={playClick}
                  onClick={() => handleCategoryClick(cat)}
                />
              ))}
            </div>

            <div className="home-footer">
              <p>🧙 Choose wisely, young wizard — your quest begins now!</p>
            </div>
          </>
        )}

        {/* DIFFICULTY PICKER VIEW */}
        {selectedCategory && (
          <div className="diff-picker-screen animate-in">
            <button className="diff-back-btn" onClick={handleBack}>
              ← Back
            </button>

            <div className="diff-picker-header">
              <div
                className="diff-cat-preview"
                style={{ backgroundColor: selectedCategory.color }}
              >
                <span className="diff-cat-emoji">{selectedCategory.emoji}</span>
                <h2 className="diff-cat-title">{selectedCategory.title}</h2>
                <p className="diff-cat-count">
                  {getQuestionCount(selectedCategory.title)} questions available
                </p>
              </div>
            </div>

            <DifficultySelector
              selected={difficulty.id}
              onSelect={setDifficulty}
            />

            <div className="diff-summary">
              <p className="diff-summary-text">
                You'll get <strong>{difficulty.questions} questions</strong>{" "}
                with <strong>{difficulty.time} seconds</strong> each!
              </p>
            </div>

            <button className="start-quiz-btn" onClick={handleStartQuiz}>
              Start {selectedCategory.title} Quiz! 🚀
            </button>

            {highScores?.[selectedCategory.title] && (
              <p className="diff-highscore">
                🏆 Your best: {highScores[selectedCategory.title].percentage}%
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
