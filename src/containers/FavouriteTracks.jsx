// React Util
import React, { useEffect, useState } from "react";

// JSX
import { TrackPreviewMd } from "../components";

const FavouriteTracks = ({ spotify }) => {
  const [tracks, setTracks] = useState(null);
  const [numTracks, setNumTracks] = useState(6);

  useEffect(() => {
    spotify
      .getMyTopTracks()
      .then((data) => setTracks(data))
      .catch((err) => {
        console.error(err);
        return <div></div>;
      });
  }, [spotify]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNumTracks(2); // Adjust the number of tracks for smaller widths
      } else if (window.innerWidth < 1024) {
        setNumTracks(4); // Adjust the number of tracks for medium widths
      } else {
        setNumTracks(6); // Default number of tracks for larger widths
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!tracks) {
    return <div></div>;
  }

  return (
    <div className={`grid grid-cols-[${numTracks}] gap-3 z-[11]`}>
      {tracks.items.slice(0, numTracks).map((track, index) => (
        <TrackPreviewMd key={index} trackData={track} />
      ))}
    </div>
  );
};

export default FavouriteTracks;
