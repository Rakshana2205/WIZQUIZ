import { useEffect, useState } from "react";
import "../styles/LoadingScreen.css";

const WIZARD_TIPS = [
  "🧙 A true wizard never stops learning!",
  "⚡ Knowledge is the most powerful spell!",
  "🌟 Every question makes you stronger!",
  "🎯 Focus your mind, young wizard!",
  "📚 The best wizards read everything!",
];

function LoadingScreen({ onFinish }) {
  const [tip] = useState(
    WIZARD_TIPS[Math.floor(Math.random() * WIZARD_TIPS.length)],
  );
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearInterval(dotsTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-wizard">🧙</div>
        <h2 className="loading-title">WizQuiz</h2>
        <p className="loading-dots">Loading{dots}</p>
        <div className="loading-bar-wrapper">
          <div className="loading-bar-fill" />
        </div>
        <p className="loading-tip">{tip}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
