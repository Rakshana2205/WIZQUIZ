import { useEffect, useState } from "react";
import "../styles/Confetti.css";

const COLORS = ["#FFD43B", "#74C0FC", "#B2F2BB", "#FFA8A8", "#E9BCFF"];

function Confetti({ show }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!show) return;
    const newPieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.8,
      duration: 1.5 + Math.random() * 1,
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);
  }, [show]);

  if (!show) return null;

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
