import "../styles/StreakBadge.css";

function StreakBadge({ streak }) {
  if (streak < 2) return null;

  function getStreakStyle() {
    if (streak >= 5) return { background: "#FFA8A8", label: "🔥 On Fire!" };
    if (streak >= 3) return { background: "#FFD43B", label: "⚡ Streak!" };
    return { background: "#B2F2BB", label: "✨ Nice!" };
  }

  const { background, label } = getStreakStyle();

  return (
    <div className="streak-badge" style={{ backgroundColor: background }}>
      <span className="streak-number">x{streak}</span>
      <span className="streak-label">{label}</span>
    </div>
  );
}

export default StreakBadge;
