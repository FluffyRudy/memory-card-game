import { useEffect, useState } from "react";
import Gameover from "./components/Gameover";
import { requests } from "./lib/requests";
import "./App.css";
import random from "./lib/random";

function App() {
  const [images, setImages] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [visited, setVisited] = useState([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);

  useEffect(() => {
    if (isFetched) return;
    fetchImages();
  }, [isFetched]);

  const fetchImages = async () => {
    const response = await requests(15);

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

  function handleClick(e) {
    const index = parseInt(e.currentTarget.dataset["index"]);
    if (visited.includes(index)) {
      setIsFetched(false);
      setVisited([]);
      setGameover(true);
      return;
    }
    setVisited((prevArr) => [index, ...prevArr]);
    setImages((prevImage) => random.shuffle([...prevImage]));
    setScore(score + 1);
  }

  return (
    <div className='app'>
      <div className='score'>
        <h1>S C O R E: {score}</h1>
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
                    loading='lazy-loading'
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
