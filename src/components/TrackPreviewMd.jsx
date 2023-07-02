import React, { useEffect, useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import Artists from "./Artists";

const TrackPreviewMd = ({ spotify, trackData }) => {
  const [artistImage, setArtistImage] = useState("");

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

  useEffect(() => {
    spotify.getArtist(trackData.artists[0].id).then((data) => {
      setArtistImage(data.images[0].url);
      console.log(data);
    });
  }, [spotify, trackData.artists]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col bg-white/10 hover:bg-white/20 border border-gray-50/10 rounded-lg p-2 min-w-[130px] max-w-[275px] sm:min-w-[150px] overflow-hidden"
    >
      {artistImage ? (
        <img
          className="absolute opacity-30 blur-sm top-0 left-0 w-full h-full object-cover object-center"
          src={artistImage}
          alt=""
        />
      ) : null}
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
      <h3 className="line-clamp-1 text-md sm:text-lg">{trackData.name}</h3>
      <Artists artists={trackData.artists} />
    </div>
  );
};

export default TrackPreviewMd;
