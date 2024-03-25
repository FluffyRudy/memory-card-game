import { useEffect, useState } from "react";
import Gameover from "./components/Gameover";
import { modes } from "./lib/data";
import { requests } from "./lib/requests";
import "./App.css";
import random from "./lib/random";

function App() {
  const [mode, setMode] = useState("easy");
  const [limit, setLimit] = useState(modes[mode]);
  const [images, setImages] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [visited, setVisited] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(
    Number(localStorage.getItem("highscore") ?? 0)
  );
  const [gameover, setGameover] = useState(false);

  useEffect(() => {
    if (isFetched) return;

    const fetchImages = async () => {
      const response = await requests(limit);

      if (response && response.status === 200) {
        const webpPreviews = response.data.data.map((imageInfo, index) => ({
          title: imageInfo.title,
          image: imageInfo.images.original.url,
          index: index,
        }));

        setImages(webpPreviews);
        setIsFetched(true);
      }
    };
    fetchImages();
  }, [isFetched, limit]);

  useEffect(() => {
    if (visited.length < images.length) return;
    setIsFetched(false);
    setVisited([]);
  }, [score, images.length, visited.length]);

  useEffect(() => {
    setVisited([]);
    setScore(0);
    setIsFetched(false);
    setLimit(modes[mode]);
  }, [mode]);

  function handleClick(e) {
    if (!isFetched) return;

    const index = parseInt(e.currentTarget.dataset["index"]);
    if (visited.includes(index)) {
      setIsFetched(false);
      setVisited([]);
      setGameover(true);
      return;
    } else {
      setVisited((prevArr) => [index, ...prevArr]);
      setImages((prevImage) => random.shuffle([...prevImage]));
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        const highscore = Number(localStorage.getItem("highscore"));
        if (!highscore || newScore > highscore) {
          localStorage.setItem("highscore", `${newScore}`);
          setHighscore(newScore);
        }
        return newScore;
      });
    }
  }

  function resetHighscore() {
    setHighscore(0);
    localStorage?.setItem("highscore", 0);
  }

  return (
    <div className='app'>
      <div className='score-modes full-width'>
        <div className='modes'>
          <p
            style={{
              textAlign: "center",
              fontSize: "x-large",
              margin: "0",
              fontWeight: "bolder",
            }}>
            Modes:
          </p>
          <button
            className={mode === "easy" ? "focus" : ""}
            onClick={() => setMode("easy")}>
            Easy
          </button>
          <button
            className={mode === "normal" ? "focus" : ""}
            onClick={() => setMode("normal")}>
            Medium
          </button>
          <button
            className={mode === "hard" ? "focus" : ""}
            onClick={() => setMode("hard")}>
            Hard
          </button>
        </div>
        <div className='score'>
          <h1>S C O R E: {score}</h1>
          <h1>H I G H &nbsp;S C O R E: {highscore}</h1>
        </div>
        <div className='reset-highscore'>
          <button onClick={resetHighscore}>Reset Highscore</button>
        </div>
      </div>
      {isFetched &&
        !gameover &&
        images.map(({ image, title, index }) => (
          <div
            className='card'
            data-index={index}
            key={image}
            onClick={handleClick}>
            <>
              <div className='top-gradient-border'></div>
              {image && (
                <>
                  <img
                    loading='lazy'
                    src={image}
                    alt={title}
                  />
                  <h2>{title.replace(/gif|undefined/gi, "")}</h2>
                </>
              )}
              <div className='bottom-gradient-border'></div>
            </>
          </div>
        ))}
      {gameover && (
        <Gameover
          setGameover={setGameover}
          setScore={setScore}
        />
      )}
    </div>
  );
}

export default App;
