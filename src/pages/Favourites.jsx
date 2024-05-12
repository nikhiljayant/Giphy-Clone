import React, { useEffect, useState } from "react";
// Context
import { GifState } from "../context/GifContext";
// Components
import Gif from "../components/Gif";

const Favourites = () => {
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const { gf, favorites } = GifState();

  const fetchFavoriteGIFs = async () => {
    const { data: gifs } = await gf.gifs(favorites);
    setFavoriteGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <div className="mt-2">
      <span className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
        {favoriteGIFs?.map((data) => (
          <Gif gif={data} key={data?.id} />
        ))}
      </span>
    </div>
  );
};

export default Favourites;
