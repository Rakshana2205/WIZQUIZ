import { useState, useEffect } from "react";

function useHighScores() {
  const [highScores, setHighScores] = useState(() => {
    try {
      const saved = localStorage.getItem("wizquiz-highscores");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("wizquiz-highscores", JSON.stringify(highScores));
  }, [highScores]);

  function updateHighScore(category, score, total) {
    const percentage = Math.round((score / total) * 100);
    setHighScores((prev) => {
      const existing = prev[category];
      if (!existing || percentage > existing.percentage) {
        return {
          ...prev,
          [category]: {
            score,
            total,
            percentage,
            date: new Date().toLocaleDateString(),
          },
        };
      }
      return prev;
    });
  }

  function getHighScore(category) {
    return highScores[category] || null;
  }

  return { highScores, updateHighScore, getHighScore };
}

export default useHighScores;
