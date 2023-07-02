// React Util
import React, { useEffect, useState } from "react";

// JSX
import { TrackPreviewMd } from "../components";

const FavouriteTracks = ({ spotify }) => {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    spotify
      .getMyTopTracks()
      .then((data) => setTracks(data))
      .catch((err) => {
        console.error(err);
        return <div></div>;
      });
  }, [spotify]);
  if (!tracks) {
    return <div></div>;
  }

  return (
    <div
      className={`flex gap-3 z-[11] overflow-auto scrollbar-thin scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 pb-1`}
    >
      {tracks.items.map((track, index) => (
        <TrackPreviewMd key={index} spotify={spotify} trackData={track} />
      ))}
    </div>
  );
};

export default FavouriteTracks;
