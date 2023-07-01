import React, { useState } from "react";

// Icons
import { BsPlayFill } from "react-icons/bs";

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
      className="flex flex-col justify-between bg-white/10 hover:bg-white/20 border border-gray-50/10 rounded-lg p-2"
    >
      <div className="flex flex-col relative">
        <img src={trackData.album.images[0].url} alt="Track" />
        <button
          className={`absolute right-1 bottom-1 rounded-full bg-primary-button hover:bg-primary-button/90 p-2 ${
            isHovered ? "flex" : "hidden"
          }`}
        >
          <BsPlayFill size={18} />
        </button>
      </div>

      <h3 className="line-clamp-2 text-lg">{trackData.name}</h3>
    </div>
  );
};

export default TrackPreviewMd;
