import React, { useEffect, useState } from "react";
import { PlaylistPreview } from "../components";

const LatestPlaylists = ({ spotify }) => {
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
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 z-[11]">
      {playlists
        .slice(0, window.innerWidth < 640 ? 2 : 3)
        .map((playlistData, index) => (
          <li key={index}>
            <PlaylistPreview playlistData={playlistData} index={index} />
          </li>
        ))}
    </ul>
  );
};

export default LatestPlaylists;
