import React, { useState } from "react";

// Icons
import { RxOpenInNewWindow } from "react-icons/rx";

const ArtistPreviewSm = ({ artistData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={artistData.external_urls.spotify}
      className="relative h-[90px] rounded-full flex items-center justify-center overflow-hidden bg-secondary-button border border-gray-400/30 shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${artistData.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-110 opacity-80" : "scale-100 opacity-30"
        }`}
        style={{
          backgroundImage: "var(--image-url)",
        }}
      ></div>
      <RxOpenInNewWindow size={25} />
    </a>
  );
};

export default ArtistPreviewSm;
