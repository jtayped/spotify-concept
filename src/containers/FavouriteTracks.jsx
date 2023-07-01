// React Util
import React, { useEffect, useState } from "react";

// JSX
import { TrackPreviewMd } from "../components";

const FavouriteTracks = ({ spotify }) => {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    spotify.getMyTopTracks({ limit: 7 }).then((data) => setTracks(data));
  }, [spotify, tracks]);
  if (!tracks) {
    return <div></div>;
  }

  return (
    <div className="grid grid-cols-7 gap-3 z-[11]">
      {tracks.items.map((track, index) => (
        <TrackPreviewMd key={index} trackData={track} />
      ))}
    </div>
  );
};

export default FavouriteTracks;
