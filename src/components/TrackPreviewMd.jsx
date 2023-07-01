import React, { useState } from "react";

// Icons
import { BsPlayFill } from "react-icons/bs";

// JSX Components
import Artists from "./Artists";

const TrackPreviewMd = ({ trackData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col bg-white/10 hover:bg-white/20 border border-gray-50/10 rounded-lg p-2"
    >
      <div className="relative">
        <img
          className="rounded-md"
          src={trackData.album.images[0].url}
          alt="Track"
        />
        <button
          className={`absolute right-1.5 bottom-1.5 rounded-full bg-primary-button hover:bg-primary-button/90 p-2 ${
            isHovered ? "flex" : "hidden"
          }`}
        >
          <BsPlayFill size={18} />
        </button>
      </div>
      <h3 className="line-clamp-2 text-lg">{trackData.name}</h3>
      <Artists artists={trackData.artists} />
    </div>
  );
};

export default TrackPreviewMd;
