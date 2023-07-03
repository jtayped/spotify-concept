// React Util
import React from "react";

// Icons
import { BsSpotify } from "react-icons/bs";

// Spotify
import { loginURL } from "../spotify/auth";

const Auth = () => {
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
};

export default Auth;
