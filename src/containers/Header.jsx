// React Util
import React, { useState } from "react";

// Icons
import { RiMenu2Fill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";

// JSX Components
import SideBar from "./SideBar";

// Animations
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ spotify }) => {
  const [isOpen, setOpen] = useState(false);
  function toggleSidebar() {
    setOpen(!isOpen);
  }

  return (
    <header className="z-[20] flex justify-between items-center rounded-lg sm:hidden">
      <button
        onClick={() => toggleSidebar()}
        className="bg-white/10 p-1 rounded border border-white/10"
      >
        <RiMenu2Fill size={25} />
      </button>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-lg font-bold leading-[15px]">Spotify Concept</h1>
        <p className="text-xs text-white/60">By Joel Taylor</p>
      </div>
      <a
        href="/search"
        className="bg-white/10 p-1 rounded border border-white/10"
      >
        <AiOutlineSearch size={25} />
      </a>

      {isOpen ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0"
          >
            <div
              onClick={() => toggleSidebar()}
              className="fixed top-0 left-0 w-full h-screen"
            ></div>
            <SideBar spotify={spotify} />
          </motion.div>
        </AnimatePresence>
      ) : null}
    </header>
  );
};

export default Header;
