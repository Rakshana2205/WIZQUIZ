import { useState } from "react";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import useHighScores from "./hooks/useHighScores";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("loading");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const { highScores, updateHighScore } = useHighScores();

  function handleLoadingFinish() {
    setCurrentPage("home");
  }

  function handleSelectCategory(category) {
    setSelectedCategory(category);
    setCurrentPage("quiz");
  }

  function handleFinish(result) {
    updateHighScore(result.category, result.score, result.total);
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

      {currentPage !== "loading" && (
        <Header highScores={highScores} onHome={handleHome} />
      )}

      {currentPage === "home" && (
        <HomePage
          onSelectCategory={handleSelectCategory}
          highScores={highScores || {}}
        />
      )}

      {currentPage === "quiz" && (
        <QuizPage
          category={selectedCategory}
          onFinish={handleFinish}
          onBack={handleHome}
        />
      )}

      {currentPage === "results" && (
        <ResultsPage
          result={quizResult}
          onPlayAgain={handlePlayAgain}
          onHome={handleHome}
        />
      )}
    </div>
  );
}

export default App;
