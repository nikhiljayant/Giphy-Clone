import React, { useEffect, useState } from "react";
// Dependency
import { useParams } from "react-router-dom";
// Context
import { GifState } from "../context/GifContext";
// Components
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";
// React Icons
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const SingleGif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadmore] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  const shareGif = () => {};
  const embedGif = () => {};

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }
    fetchGif();
  }, []);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description?.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadmore(!readMore)}
                >
                  {gif?.user?.description?.length > 100 &&
                    (!readMore ? (
                      <>
                        Read Less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read More <HiMiniChevronDown size={20} />
                      </>
                    ))}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w3/4">
            <div className="faded-text truncate mb-2">{gif?.title}</div>
            <Gif gif={gif} hover={false} />

            {/* Mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="font-bold">{gif?.user?.username}</div>
              </div>

              <button className="ml-auto" onClick={shareGif}>
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${favorites.includes(
                  gif.id
                )} ? 'text-red-500' : ''`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={embedGif}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp
                size={30}
                className={`${favorites.includes(
                  gif.id
                )} ? 'text-red-500' : ''`}
              />
              Embed
            </button>
          </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs?.slice(1).map((data) => (
              <Gif gif={data} key={data?.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
