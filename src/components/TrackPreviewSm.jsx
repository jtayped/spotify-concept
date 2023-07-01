import React, { useState } from "react";

const TrackPreviewSm = ({ trackData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={trackData.external_urls.spotify}
      className="relative h-[50px] flex items-center justify-center rounded overflow-hidden bg-secondary-button border border-gray-400/30 shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${trackData.album.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-105 opacity-50" : "scale-100 opacity-20"
        }`}
        style={{
          backgroundImage: "var(--image-url)",
        }}
      ></div>
      <h3 className="text-sm relative whitespace-nowrap text-center truncate ... max-w-[90%]">
        {trackData.name}
      </h3>
    </a>
  );
};

export default TrackPreviewSm;
