// React Util
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// JSX Components
import { SideBar } from "../containers";

// Spotify
import { getTokenFromURL } from "../spotify/auth";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const _spotifyToken = getTokenFromURL().access_token;

    if (_spotifyToken) {
      spotify.setAccessToken(_spotifyToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="text-text bg-background font-gotham">
      <SideBar spotify={spotify} />

      <div className="absolute z-[0] w-[60%] h-[60%] top-0 green__gradient" />
      <div className="absolute z-[1] w-[35%] h-[35%] right-0 bottom-0 white__gradient" />
    </div>
  );
};

export default Home;
