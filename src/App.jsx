import React, { useEffect, useState } from "react";

// JSX Components
import {
  SideBar,
  LatestPlaylists,
  FavouriteTracks,
  PortfolioBanner,
  Header,
} from "./containers";

// Spotify
import { getTokenFromURL, loginURL } from "./spotify/auth";
import SpotifyWebApi from "spotify-web-api-js";

// Icons
import { BsSpotify } from "react-icons/bs";

const spotify = new SpotifyWebApi();
let _spotifyToken = "";

function App() {
  const [artist, setArtist] = useState("");

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    _spotifyToken = getTokenFromURL().access_token;

    if (_spotifyToken) {
      spotify.setAccessToken(_spotifyToken);
      setHasToken(true);
    }
  }, []);

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

  if (hasToken) {
    return (
      <div className="relative text-text bg-background font-gotham">
        <div className="hidden md:flex fixed top-0 left-0">
          <SideBar spotify={spotify} />
        </div>
        <main className="relative md:ml-sidebar sm:mt-0 p-5 md:p-10 flex flex-col gap-5 h-full">
          <Header spotify={spotify} />
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
  } else {
    return (
      <div className="flex items-center justify-center w-full h-screen overflow-hidden text-text font-gotham">
        <div className="flex flex-col items-center gap-3 max-w-[500px] px-5">
          <div className="text-center">
            <div></div>
            <h1 className="text-5xl font-bold">Spotify Concept</h1>
            <p className="text-sm text-white/80 font-poppins font-semibold">
              By Joel Taylor
            </p>
            <p className="font-light text-white/90 mt-2">
              Experience the ultimate music discovery with my visually stunning
              Spotify Concept website. Connect, authorize, and explore your
              favorite tracks and playlists effortlessly.
            </p>
          </div>

          <a
            href={loginURL}
            className="bg-spotify/90 hover:bg-spotify/80 transition-colors duration-200 rounded-lg flex items-center gap-3 p-3"
          >
            <BsSpotify size={23} />
            Connect with Spotify
          </a>
        </div>
        <div className="absolute z-[1] w-[35%] h-[35%] right-10 bottom-10 bg-gradient-to-t from-spotify to-spotify/90 blur-[500px]" />
      </div>
    );
  }
}

export default App;
