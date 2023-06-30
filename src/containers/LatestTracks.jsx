// React Util
import React, { useEffect, useState } from "react";

// Icons
import { BsPlayFill } from "react-icons/bs";

const PlaylistPreview = ({ playlistData }) => {
  console.log(playlistData);
  return (
    <div className="p-3 xl:p-2 bg-white/10 rounded-xl flex flex-col xl:flex-row gap-3 justify-between">
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-5 overflow-hidden">
        <a href={playlistData.external_urls.spotify}>
          <img
            className="w-full aspect-square xl:max-h-[100px] xl:min-w-[100px] rounded"
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
        <button className="rounded-full xl:rounded bg-primary-button p-2">
          <BsPlayFill size={18} />
        </button>
      </div>
    </div>
  );
};

const LatestTracks = ({ spotify }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading(true);

    // Fetch recently played tracks
    spotify.getMyRecentlyPlayedTracks({ limit: 50 }).then((response) => {
      const recentlyPlayedTracks = response.items;
      const playlistIds = recentlyPlayedTracks
        .filter((track) => track.context && track.context.type === "playlist")
        .map((track) => track.context.uri.split(":")[2]);

      // Remove duplicate playlist ids
      const uniquePlaylistIds = [...new Set(playlistIds)];

      // Fetch playlist data for each unique id
      const fetchPlaylistData = async () => {
        const playlistDataPromises = uniquePlaylistIds.map((playlistId) =>
          spotify.getPlaylist(playlistId)
        );
        const playlistData = await Promise.all(playlistDataPromises);
        setPlaylists(playlistData);
      };

      fetchPlaylistData();
      setLoading(false);
    });
  }, [spotify]);

  if (loading) {
    return <div></div>;
  }
  return (
    <ul className="grid grid-cols-3 gap-3">
      {playlists.map((playlistData, index) => (
        <li key={index}>
          <PlaylistPreview playlistData={playlistData} />
        </li>
      ))}
    </ul>
  );
};

export default LatestTracks;
