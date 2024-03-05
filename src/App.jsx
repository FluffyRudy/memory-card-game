import { useEffect, useState } from "react";
import { requests } from "./lib/requests";
import "./App.css";
import random from "./lib/random";

function App() {
  const [images, setImages] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    if (isFetched) return;
    fetchImages();
  }, [isFetched]);

  const fetchImages = async () => {
    const response = await requests("naruto");

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
      alert("visited");
      setImages((prevImage) => random.shuffle([...prevImage]));
      return;
    }
    setVisited((prevArr) => [index, ...prevArr]);
    setImages((prevImage) => random.shuffle([...prevImage]));
  }

  return (
    <div className='app'>
      {images.map(({ image, title, index }) => (
        <div
          className='card'
          data-index={index}
          key={image}
          onClick={handleClick}>
          {image && (
            <>
              <img
                src={image}
                alt={title}
              />
              <h2>{title.replace(/gif|undefined/gi, "")}</h2>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
