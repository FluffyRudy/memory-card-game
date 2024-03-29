import PropTypes from "prop-types";

export default function Gameover({ setGameover, setScore }) {
  function handleGameover() {
    setScore(0);
    setGameover(false);
  }
  return (
    <div className='gameover'>
      <h1>Game Over</h1>
      <button onClick={handleGameover}>Try Again</button>
    </div>
  );
}

Gameover.propTypes = {
  setGameover: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};
