// React Util
import React from "react";

// Images
import Portfolio from "../assets/images/Portfolio.webp";

// Icons
import { IoMdOpen } from "react-icons/io";

const PortfolioBanner = () => {
  return (
    <a
      href="https://joeltaylor.business"
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-full py-12 w-full flex justify-center items-center rounded-xl border border-gray-50/70 overflow-hidden z-[11]"
    >
      <img
        className="absolute top-0 left-0 w-full h-full opacity-40 blur-sm object-cover object-top"
        src={Portfolio}
        alt="My Portfolio"
      />
      <p className="text-2xl sm:text-3xl md:text-xl border border-gray-50/50 px-4 sm:px-7 py-2 sm:py-4 rounded-lg flex items-center gap-4 hover:bg-white/20 transition-colors duration-200 z-[12]">
        Visit my portfolio <IoMdOpen />
      </p>
    </a>
  );
};

export default PortfolioBanner;
