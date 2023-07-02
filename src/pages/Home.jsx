// React Util
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// JSX Components
import {
  SideBar,
  LatestPlaylists,
  FavouriteTracks,
  PortfolioBanner,
} from "../containers";

// Spotify
import { getTokenFromURL } from "../spotify/auth";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

let _spotifyToken = "";
const Home = () => {
  const [artist, setArtist] = useState("");

  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    _spotifyToken = getTokenFromURL().access_token;

    if (_spotifyToken) {
      spotify.setAccessToken(_spotifyToken);
      setHasToken(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (_spotifyToken) {
      spotify.getMyTopArtists({ limit: 5 }).then((data) => {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        const artist = data.items[randomIndex];
        if (artist.images.length > 0) {
          const randomImageIndex = Math.floor(
            Math.random() * artist.images.length
          );
          setArtist(artist.images[randomImageIndex].url);
        }
      });
    }
  }, []);

  if (!hasToken) {
    return null;
  }
  return (
    <div className="relative text-text bg-background font-gotham">
      <SideBar spotify={spotify} />
      <main className="relative md:ml-sidebar p-5 md:p-10 flex flex-col gap-5 h-full">
        <LatestPlaylists spotify={spotify} />
        <FavouriteTracks spotify={spotify} />
        <PortfolioBanner />
        {artist ? (
          <img
            className="absolute top-0 left-0 w-full h-screen opacity-20 blur-lg object-cover object-center"
            src={artist}
            alt="Background"
          />
        ) : null}
      </main>
    </div>
  );
};

export default Home;
