import "../styles/Header.css";

function Header({ highScores, onHome }) {
  const totalGames = Object.keys(highScores).length;

  return (
    <header className="wiz-header">
      <button className="header-logo" onClick={onHome}>
        🧙 WizQuiz
      </button>
      <div className="header-right">
        {totalGames > 0 && (
          <span className="header-badge">
            🏆 {totalGames} best score{totalGames > 1 ? "s" : ""} saved!
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
