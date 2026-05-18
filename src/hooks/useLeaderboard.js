import { useState, useEffect } from "react";

function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const saved = localStorage.getItem("wizquiz-leaderboard");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("wizquiz-leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  function addScore(category, player, score, total) {
    const percentage = Math.round((score / total) * 100);
    const entry = {
      name: player.name,
      avatar: player.avatar,
      score,
      total,
      percentage,
      date: new Date().toLocaleDateString(),
    };

    setLeaderboard((prev) => {
      const categoryScores = prev[category] || [];
      const updated = [...categoryScores, entry]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);
      return { ...prev, [category]: updated };
    });
  }

  function getCategoryLeaderboard(category) {
    return leaderboard[category] || [];
  }

  return { leaderboard, addScore, getCategoryLeaderboard };
}

export default useLeaderboard;
