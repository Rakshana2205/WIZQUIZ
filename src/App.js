import { useState } from "react";
import PlayerSetupPage from "./pages/PlayerSetupPage";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import DailyChallengePage from "./pages/DailyChallengePage";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import useHighScores from "./hooks/useHighScores";
import useLeaderboard from "./hooks/useLeaderboard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("loading");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [difficulty, setDifficulty] = useState({
    id: "medium",
    time: 15,
    questions: 10,
  });
  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem("wizquiz-player");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { highScores, updateHighScore } = useHighScores();
  const { leaderboard, addScore, getCategoryLeaderboard } = useLeaderboard();

  function handleLoadingFinish() {
    setCurrentPage(player ? "home" : "setup");
  }

  function handlePlayerStart(playerData) {
    localStorage.setItem("wizquiz-player", JSON.stringify(playerData));
    setPlayer(playerData);
    setCurrentPage("home");
  }

  function handleSelectCategory(category, diff) {
    setSelectedCategory(category);
    if (diff) setDifficulty(diff);
    setCurrentPage("quiz");
  }

  function handleFinish(result) {
    updateHighScore(result.category, result.score, result.total);
    if (player) {
      addScore(result.category, player, result.score, result.total);
    }
    setQuizResult(result);
    setCurrentPage("results");
  }

  function handlePlayAgain() {
    setCurrentPage("quiz");
    setQuizResult(null);
  }

  function handleHome() {
    setCurrentPage("home");
    setSelectedCategory(null);
    setQuizResult(null);
  }

  return (
    <div className="App">
      {currentPage === "loading" && (
        <LoadingScreen onFinish={handleLoadingFinish} />
      )}

      {currentPage === "setup" && (
        <PlayerSetupPage onStart={handlePlayerStart} savedPlayer={player} />
      )}

      {currentPage !== "loading" && currentPage !== "setup" && (
        <Header
          highScores={highScores}
          onHome={handleHome}
          player={player}
          onLeaderboard={() => setCurrentPage("leaderboard")}
          onChangePlayer={() => setCurrentPage("setup")}
        />
      )}

      {currentPage === "home" && (
        <HomePage
          onSelectCategory={handleSelectCategory}
          highScores={highScores || {}}
          onDailyChallenge={() => setCurrentPage("daily")}
          player={player}
        />
      )}

      {currentPage === "quiz" && (
        <QuizPage
          category={selectedCategory}
          difficulty={difficulty}
          onFinish={handleFinish}
          onBack={handleHome}
        />
      )}

      {currentPage === "daily" && (
        <DailyChallengePage
          player={player}
          onFinish={handleFinish}
          onBack={handleHome}
        />
      )}

      {currentPage === "results" && (
        <ResultsPage
          result={quizResult}
          onPlayAgain={handlePlayAgain}
          onHome={handleHome}
          player={player}
        />
      )}

      {currentPage === "leaderboard" && (
        <LeaderboardPage leaderboard={leaderboard} onBack={handleHome} />
      )}
    </div>
  );
}

export default App;
