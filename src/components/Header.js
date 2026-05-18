import "../styles/Header.css";

function Header({ highScores, onHome, player, onLeaderboard, onChangePlayer }) {
  const totalGames = Object.keys(highScores || {}).length;

  return (
    <header className="wiz-header">
      <button className="header-logo" onClick={onHome}>
        🧙 WizQuiz
      </button>
      <div className="header-right">
        {player && (
          <button className="header-player" onClick={onChangePlayer}>
            {player.avatar} {player.name}
          </button>
        )}
        <button className="header-lb-btn" onClick={onLeaderboard}>
          🏆 Scores
        </button>
        {totalGames > 0 && (
          <span className="header-badge">
            ⭐ {totalGames} best{totalGames > 1 ? "s" : ""}!
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
