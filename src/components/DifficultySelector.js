import useSound from "../hooks/useSound";
import "../styles/DifficultySelector.css";

const DIFFICULTIES = [
  {
    id: "easy",
    label: "Easy",
    emoji: "🌱",
    time: 20,
    color: "#B2F2BB",
    desc: "20 seconds per question",
    questions: 8,
  },
  {
    id: "medium",
    label: "Medium",
    emoji: "⚡",
    time: 15,
    color: "#FFD43B",
    desc: "15 seconds per question",
    questions: 10,
  },
  {
    id: "hard",
    label: "Hard",
    emoji: "🔥",
    time: 10,
    color: "#FFA8A8",
    desc: "10 seconds per question",
    questions: 12,
  },
];

function DifficultySelector({ selected, onSelect }) {
  const { playClick } = useSound();

  return (
    <div className="diff-wrapper">
      <p className="diff-title">Choose Difficulty</p>
      <div className="diff-grid">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            className={`diff-card ${selected === d.id ? "diff-selected" : ""}`}
            style={{ backgroundColor: d.color }}
            onClick={() => {
              playClick();
              onSelect(d);
            }}
          >
            <span className="diff-emoji">{d.emoji}</span>
            <span className="diff-label">{d.label}</span>
            <span className="diff-desc">{d.desc}</span>
            <span className="diff-qs">{d.questions} questions</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;
