// React Icons
import React from "react";

// Images
import DefaultPFP from "../assets/images/defaultPfp.jpg";

const Header = () => {
  return (
    <header className="flex items-center fixed top-0 left-sidebar w-[calc(100%-300px)] text-sm px-10 h-[75px] z-[10]">
      <div className="flex gap-2 items-center rounded-full p-1 pr-3 bg-white/10">
        <a href="https://spotify.com/users/jtayped">
          <img
            className="h-[30px] aspect-square rounded-full"
            src={DefaultPFP}
            alt="Profile"
          />
        </a>
        <div className="flex flex-col leading-tight">
          <p className="text-[10px] text-white/30">Joel Taylor</p>
          <p>jtayped</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
