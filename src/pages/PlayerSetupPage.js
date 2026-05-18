import { useState } from "react";
import useSound from "../hooks/useSound";
import "../styles/PlayerSetupPage.css";

const AVATARS = [
  "🧙",
  "🦊",
  "🐱",
  "🚀",
  "⭐",
  "🎯",
  "🦄",
  "🐸",
  "💎",
  "🔥",
  "🌟",
  "🎮",
  "🏆",
  "⚡",
  "🎨",
];

function PlayerSetupPage({ onStart, savedPlayer }) {
  const [name, setName] = useState(savedPlayer?.name || "");
  const [avatar, setAvatar] = useState(savedPlayer?.avatar || "🧙");
  const [error, setError] = useState("");
  const { playClick, playStart } = useSound();

  function handleStart() {
    if (!name.trim()) {
      setError("Please enter your name to continue!");
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters!");
      return;
    }
    playStart();
    onStart({ name: name.trim(), avatar });
  }

  return (
    <div className="setup-wrapper">
      <div className="setup-page">
        <div className="setup-header">
          <div className="setup-wizard">🧙</div>
          <h1 className="setup-title">Welcome to WizQuiz!</h1>
          <p className="setup-subtitle">
            Tell us who you are before the quest begins!
          </p>
        </div>

        <div className="setup-card">
          <div className="setup-section">
            <label className="setup-label">Your Name</label>
            <input
              className="setup-input"
              type="text"
              placeholder="Enter your wizard name..."
              value={name}
              maxLength={20}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
            />
            {error && <p className="setup-error">{error}</p>}
          </div>

          <div className="setup-section">
            <label className="setup-label">Pick Your Avatar</label>
            <div className="avatar-grid">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  className={`avatar-btn ${avatar === av ? "selected" : ""}`}
                  onClick={() => {
                    playClick();
                    setAvatar(av);
                  }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div className="setup-preview">
            <span className="preview-avatar">{avatar}</span>
            <span className="preview-name">
              {name.trim() || "Your Name Here"}
            </span>
          </div>

          <button className="setup-btn" onClick={handleStart}>
            Start My Quest! ✨
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerSetupPage;
