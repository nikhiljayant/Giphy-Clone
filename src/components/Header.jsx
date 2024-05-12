import React, { useEffect, useState } from "react";
// Dependency
import { Link } from "react-router-dom";
// CSS
import "../App.css";
// React Icons
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
// Context
import { GifState } from "../context/GifContext";
// Components
import SearchGif from "./SearchGif";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const { gf, favorites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="Giphy Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {categories?.slice(0, 5)?.map((data) => {
            return (
              <Link
                key={data?.name}
                to={`/${data?.name_encoded}`}
                className="px-4 py-1 hover:gradient border-b-4 hidden lg:block"
              >
                {data?.name}
              </Link>
            );
          })}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>
          {favorites?.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          )}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-600 block lg:hidden"
            />
          </button>
        </div>
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories?.map((data) => {
                return (
                  <Link
                    className="font-bold"
                    key={data?.name}
                    to={`/${data?.name_encoded}`}
                  >
                    {data?.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <SearchGif />
    </nav>
  );
};

export default Header;
