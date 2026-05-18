import { useState, useEffect, useCallback } from "react";
import questions from "../data/questions";
import AnswerCard from "../components/AnswerCard";
import StreakBadge from "../components/StreakBadge";
import useSound from "../hooks/useSound";
import "../styles/QuizPage.css";

const ANSWER_COLORS = ["#FFD43B", "#74C0FC", "#B2F2BB", "#FFA8A8"];
const TIME_PER_QUESTION = 15;

function QuizPage({ category, onFinish, onBack }) {
  const allCategoryQuestions = questions.filter((q) => q.category === category);
  const categoryQuestions = [...allCategoryQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  const { playCorrect, playWrong, playComplete, playBack } = useSound();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const currentQuestion = categoryQuestions[currentIndex];
  const totalQuestions = categoryQuestions.length;
  const progress = (currentIndex / totalQuestions) * 100;

  const handleAnswer = useCallback(
    (answer) => {
      if (isAnswered) return;
      const isCorrect = answer === currentQuestion.correct;
      setSelectedAnswer(answer);
      setIsAnswered(true);

      if (isCorrect) {
        playCorrect();
        setScore((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        setShowStreak(true);
      } else {
        playWrong();
        setStreak(0);
      }

      const newAnswer = {
        question: currentQuestion.question,
        selected: answer,
        correct: currentQuestion.correct,
        isCorrect,
      };

      setQuizAnswers((prev) => {
        const updatedAnswers = [...prev, newAnswer];
        setTimeout(() => {
          if (currentIndex + 1 < totalQuestions) {
            setCurrentIndex((p) => p + 1);
          } else {
            playComplete();
            onFinish({
              score: isCorrect ? score + 1 : score,
              total: totalQuestions,
              category,
              answers: updatedAnswers,
            });
          }
        }, 1500);
        return updatedAnswers;
      });
    },
    [
      isAnswered,
      currentQuestion,
      currentIndex,
      totalQuestions,
      score,
      category,
      onFinish,
      playCorrect,
      playWrong,
      playComplete,
    ],
  );

  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, handleAnswer]);

  useEffect(() => {
    setTimeLeft(TIME_PER_QUESTION);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowStreak(false);
  }, [currentIndex]);

  function getTimerColor() {
    if (timeLeft > 10) return "#B2F2BB";
    if (timeLeft > 5) return "#FFD43B";
    return "#FFA8A8";
  }

  return (
    <div className="quiz-wrapper">
      <div className="quiz-page">
        <div className="quiz-topbar">
          <button
            className="quiz-back-btn"
            onClick={() => {
              playBack();
              onBack();
            }}
          >
            ← Back
          </button>
          <div className="quiz-category-badge">
            {currentQuestion.emoji} {category}
          </div>
          <div className="quiz-score-badge">
            ⭐ {score}/{totalQuestions}
          </div>
        </div>

        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-text">
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        <div
          className="timer-circle"
          style={{ backgroundColor: getTimerColor() }}
        >
          <span className="timer-number">{timeLeft}</span>
          <span className="timer-label">secs</span>
        </div>

        {showStreak && <StreakBadge streak={streak} />}

        <div className="question-card">
          <p className="question-number">Question {currentIndex + 1}</p>
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>

        <div className="answers-grid">
          {currentQuestion.options.map((option, index) => (
            <AnswerCard
              key={option}
              option={option}
              color={ANSWER_COLORS[index]}
              isAnswered={isAnswered}
              isCorrect={option === currentQuestion.correct}
              isSelected={option === selectedAnswer}
              onClick={() => handleAnswer(option)}
            />
          ))}
        </div>

        {isAnswered && (
          <div
            className={`feedback-banner ${
              selectedAnswer === currentQuestion.correct
                ? "feedback-correct"
                : "feedback-wrong"
            }`}
          >
            {selectedAnswer === currentQuestion.correct
              ? "🎉 Correct! Well done wizard!"
              : selectedAnswer === null
                ? `⏰ Time up! Answer: ${currentQuestion.correct}`
                : `❌ Wrong! Answer: ${currentQuestion.correct}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
