import { useState, useEffect } from "react";
import questions from "../data/questions";
import AnswerCard from "../components/AnswerCard";
import Lifelines from "../components/Lifelines";
import useSound from "../hooks/useSound";
import "../styles/DailyChallengePage.css";

const ANSWER_COLORS = ["#FFD43B", "#74C0FC", "#B2F2BB", "#FFA8A8"];
const QUESTIONS_COUNT = 10;
const TIME_PER_QUESTION = 12;

function getDailyQuestions() {
  const today = new Date().toDateString();
  const seed = today.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...questions].sort((a, b) => {
    const ra = Math.sin(seed + a.id) * 10000;
    const rb = Math.sin(seed + b.id) * 10000;
    return ra - Math.floor(ra) - (rb - Math.floor(rb));
  });
  return shuffled.slice(0, QUESTIONS_COUNT);
}

function DailyChallengePage({ player, onFinish, onBack }) {
  const dailyQuestions = getDailyQuestions();
  const { playCorrect, playWrong, playComplete, playBack } = useSound();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [usedSkip, setUsedSkip] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);

  const currentQuestion = dailyQuestions[currentIndex];
  const totalQuestions = dailyQuestions.length;
  const progress = (currentIndex / totalQuestions) * 100;

  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    setTimeLeft(TIME_PER_QUESTION);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setHiddenOptions([]);
  }, [currentIndex]);

  function handleAnswer(answer) {
    if (isAnswered) return;
    const isCorrect = answer === currentQuestion.correct;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (isCorrect) {
      playCorrect();
      setScore((p) => p + 1);
    } else playWrong();

    const newAnswer = {
      question: currentQuestion.question,
      selected: answer,
      correct: currentQuestion.correct,
      isCorrect,
    };

    setQuizAnswers((prev) => {
      const updated = [...prev, newAnswer];
      setTimeout(() => {
        if (currentIndex + 1 < totalQuestions) {
          setCurrentIndex((p) => p + 1);
        } else {
          playComplete();
          onFinish({
            score: isCorrect ? score + 1 : score,
            total: totalQuestions,
            category: "📅 Daily Challenge",
            answers: updated,
            isDaily: true,
          });
        }
      }, 1500);
      return updated;
    });
  }

  function handleFiftyFifty() {
    if (usedFiftyFifty || isAnswered) return;
    setUsedFiftyFifty(true);
    const wrongOptions = currentQuestion.options.filter(
      (o) => o !== currentQuestion.correct,
    );
    const toHide = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  }

  function handleSkip() {
    if (usedSkip || isAnswered) return;
    setUsedSkip(true);
    const newAnswer = {
      question: currentQuestion.question,
      selected: "Skipped",
      correct: currentQuestion.correct,
      isCorrect: false,
    };
    setQuizAnswers((prev) => {
      const updated = [...prev, newAnswer];
      if (currentIndex + 1 < totalQuestions) {
        setCurrentIndex((p) => p + 1);
      } else {
        playComplete();
        onFinish({
          score,
          total: totalQuestions,
          category: "📅 Daily Challenge",
          answers: updated,
          isDaily: true,
        });
      }
      return updated;
    });
  }

  function getTimerColor() {
    if (timeLeft > 8) return "#B2F2BB";
    if (timeLeft > 4) return "#FFD43B";
    return "#FFA8A8";
  }

  return (
    <div className="daily-wrapper">
      <div className="daily-page">
        <div className="daily-topbar">
          <button
            className="quiz-back-btn"
            onClick={() => {
              playBack();
              onBack();
            }}
          >
            ← Back
          </button>
          <div className="daily-badge">📅 Daily Challenge</div>
          <div className="quiz-score-badge">
            ⭐ {score}/{totalQuestions}
          </div>
        </div>

        <div className="daily-player">
          <span>{player.avatar}</span>
          <span>{player.name}</span>
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

        <Lifelines
          onFiftyFifty={handleFiftyFifty}
          onSkip={handleSkip}
          usedFiftyFifty={usedFiftyFifty}
          usedSkip={usedSkip}
        />

        <div className="question-card">
          <p className="question-number">
            {currentQuestion.emoji} Question {currentIndex + 1}
          </p>
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>

        <div className="answers-grid">
          {currentQuestion.options.map((option, index) => {
            if (hiddenOptions.includes(option)) return null;
            return (
              <AnswerCard
                key={option}
                option={option}
                color={ANSWER_COLORS[index]}
                isAnswered={isAnswered}
                isCorrect={option === currentQuestion.correct}
                isSelected={option === selectedAnswer}
                onClick={() => handleAnswer(option)}
              />
            );
          })}
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
              ? "🎉 Correct! Keep going!"
              : selectedAnswer === null
                ? `⏰ Time up! Answer: ${currentQuestion.correct}`
                : `❌ Wrong! Answer: ${currentQuestion.correct}`}
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyChallengePage;
