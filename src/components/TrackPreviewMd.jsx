import React, { useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import Artists from "./Artists";

const TrackPreviewMd = ({ trackData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  let audioRef = null;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
        audioRef.currentTime = 0;
      } else {
        audioRef.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const hasPreviewUrl = trackData.preview_url !== null;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col bg-white/10 hover:bg-white/20 border border-gray-50/10 rounded-lg p-2 max-w-[275px] min-w-[150px]"
    >
      <div className="relative">
        <img
          className="rounded-md"
          src={trackData.album.images[0].url}
          alt="Track"
        />
        {hasPreviewUrl && (
          <button
            onClick={handleButtonClick}
            className={`absolute right-1.5 bottom-1.5 rounded-full bg-primary-button hover:bg-primary-button/90 p-2 ${
              isHovered ? "flex" : "md:hidden"
            }`}
          >
            {isPlaying ? <BsPauseFill size={18} /> : <BsPlayFill size={18} />}
          </button>
        )}
        {hasPreviewUrl && (
          <audio
            ref={(audio) => {
              audioRef = audio;
            }}
            src={trackData.preview_url}
            onEnded={handleAudioEnded}
          />
        )}
      </div>
      <h3 className="line-clamp-2 text-lg">{trackData.name}</h3>
      <Artists artists={trackData.artists} />
    </div>
  );
};

export default TrackPreviewMd;
