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
  const [backgroundImage, setBackgroundImage] = useState("");

  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    _spotifyToken = getTokenFromURL().access_token;

    if (_spotifyToken) {
      spotify.setAccessToken(_spotifyToken);
      setHasToken(true);
    }
  }, [navigate]);

  if (!hasToken) {
    return <div></div>;
  }
  return (
    <div className="relative text-text bg-background font-gotham">
      <SideBar spotify={spotify} />
      <main className="relative md:ml-sidebar p-5 md:p-10 flex flex-col gap-5 h-full">
        <LatestPlaylists spotify={spotify} />
        <FavouriteTracks spotify={spotify} />
        <PortfolioBanner />
        <img
          className="absolute top-0 left-0 w-full h-screen opacity-30 blur-lg object-cover object-center"
          src="https://i.scdn.co/image/ab67616d0000b273750d9fe0a5648ad5fde3a44e"
          alt="Background"
        />
      </main>
    </div>
  );
};

export default Home;
