import { useState } from "react";
import "../styles/LeaderboardPage.css";
import useSound from "../hooks/useSound";

const CATEGORIES = ["Science", "Geography", "Maths", "History", "Movies"];
const MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

function LeaderboardPage({ leaderboard, onBack }) {
  const { playBack } = useSound();
  const [activeCategory, setActiveCategory] = useState("Science");
  const scores = leaderboard[activeCategory] || [];

  return (
    <div className="lb-wrapper">
      <div className="lb-page">
        <div className="lb-header">
          <button
            className="lb-back-btn"
            onClick={() => {
              playBack();
              onBack();
            }}
          >
            ← Back
          </button>
          <h1 className="lb-title">🏆 Leaderboard</h1>
        </div>

        <div className="lb-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`lb-tab ${activeCategory === cat ? "lb-tab-active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="lb-list">
          {scores.length === 0 ? (
            <div className="lb-empty">
              <p className="lb-empty-emoji">🎮</p>
              <p className="lb-empty-text">No scores yet!</p>
              <p className="lb-empty-sub">
                Play {activeCategory} to be the first!
              </p>
            </div>
          ) : (
            scores.map((entry, i) => (
              <div key={i} className={`lb-entry ${i === 0 ? "lb-first" : ""}`}>
                <span className="lb-medal">{MEDALS[i]}</span>
                <span className="lb-avatar">{entry.avatar}</span>
                <div className="lb-info">
                  <p className="lb-name">{entry.name}</p>
                  <p className="lb-date">{entry.date}</p>
                </div>
                <div className="lb-score-box">
                  <p className="lb-score">{entry.percentage}%</p>
                  <p className="lb-score-sub">
                    {entry.score}/{entry.total}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
