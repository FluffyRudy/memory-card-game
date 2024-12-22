import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Instructions = ({ setShowInstructions }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasSeenInstructions = sessionStorage.getItem("hasSeenInstructions");

    if (!hasSeenInstructions) {
      setIsFirstVisit(true);
    }
  }, []);

  const handleGotIt = () => {
    sessionStorage.setItem("hasSeenInstructions", "true");

    setShowInstructions(false);
  };

  if (!isFirstVisit) {
    return null;
  }

  return (
    <div
      className="instructions"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="instructions-content"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          color: "black",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "black" }}>How to Play</h2>
        <ul style={{ textAlign: "left", marginBottom: "20px" }}>
          <li>Click on any card to earn points.</li>
          <li>Do not click on the same card twice, or the game ends!</li>
          <li>Cards will shuffle after every click to make it challenging.</li>
          <li>Try to beat your high score!</li>
        </ul>
        <button
          onClick={handleGotIt}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Got It!
        </button>
      </div>
    </div>
  );
};

Instructions.propTypes = {
  setShowInstructions: PropTypes.func.isRequired,
};

export default Instructions;
