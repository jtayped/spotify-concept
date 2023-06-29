// React Util
import React from "react";

// Icons
import { BsSpotify } from "react-icons/bs";

// Spotify
import { loginURL } from "../spotify/auth";

const Auth = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden">
      <a
        href={loginURL}
        className="text-text bg-gradient-to-br from-spotify from-5% to-spotify/40 rounded-lg flex items-center gap-2 p-3 font-poppins "
      >
        <BsSpotify size={23} />
        Connect with Spotify
      </a>
      <div className="absolute z-[1] w-[35%] h-[35%] right-10 bottom-10 white__gradient" />
    </div>
  );
};

export default Auth;
