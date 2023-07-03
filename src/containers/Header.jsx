// React Util
import React, { useState } from "react";

// Icons
import { RiMenu3Fill } from "react-icons/ri";

// JSX Components
import SideBar from "./SideBar";

const Header = ({ spotify }) => {
  const [isOpen, setOpen] = useState(false);
  function toggleSidebar() {
    setOpen(!isOpen);
  }

  return (
    <header className="z-[20] flex justify-end rounded-lg sm:hidden">
      <button
        onClick={() => toggleSidebar()}
        className="bg-white/10 p-1 rounded border border-white/10"
      >
        <RiMenu3Fill size={25} />
      </button>

      {isOpen ? <SideBar spotify={spotify} /> : null}
    </header>
  );
};

export default Header;
