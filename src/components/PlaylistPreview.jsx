// React Util
import React, { useState } from "react";

// Icons
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

// Animations
import { motion } from "framer-motion";

const PlaylistPreview = ({ playlistData, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playTrack = () => {
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === playlistData.tracks.items.lenght - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTrack = playlistData.tracks.items[currentTrackIndex];

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.075 }}
      className="h-full p-3 xl:p-2 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl flex flex-col xl:flex-row gap-3 justify-between border border-gray-50/10"
    >
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-5 overflow-hidden">
        <a href={playlistData.external_urls.spotify}>
          <img
            className="w-full aspect-square xl:max-h-[100px] xl:min-w-[100px] rounded-md"
            src={playlistData.images[0].url}
            alt=""
          />
        </a>
        <div className="flex flex-col text-xs max-w-[270px]">
          <h3 className="font-bold text-xl text-text whitespace-nowrap truncate ...">
            {playlistData.name}
          </h3>
          <p className="line-clamp-2 xl:line-clamp-4">
            {playlistData.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-full xl:rounded bg-primary-button hover:bg-primary-button/90 p-2"
          onClick={() => {
            if (isPlaying) {
              pauseTrack();
            } else {
              playTrack();
            }
          }}
        >
          {isPlaying ? <BsPauseFill size={18} /> : <BsPlayFill size={18} />}
        </button>
      </div>
      {isPlaying && (
        <audio
          src={currentTrack.track.preview_url}
          autoPlay
          onEnded={playNextTrack}
        />
      )}
    </motion.div>
  );
};

export default PlaylistPreview;
