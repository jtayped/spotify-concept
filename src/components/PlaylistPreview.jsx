// React Util
import React from "react";

// Icons
import { BsPlayFill } from "react-icons/bs";

const PlaylistPreview = ({ playlistData }) => {
  return (
    <div className="p-3 xl:p-2 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl flex flex-col xl:flex-row gap-3 justify-between border border-gray-50/10">
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
        <button className="rounded-full xl:rounded bg-primary-button hover:bg-primary-button/90 p-2">
          <BsPlayFill size={18} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistPreview;
