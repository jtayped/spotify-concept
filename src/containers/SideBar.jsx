// React Util
import React, { useEffect, useState } from "react";

// Images
import DefaultPFP from "../assets/images/defaultPfp.jpg";

// Constants
import { mainPages } from "../constants/nav";

// Icons
import { RxOpenInNewWindow } from "react-icons/rx";

const ArtistPreviewSm = ({ artistData }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={artistData.external_urls.spotify}
      className="relative h-20 rounded-full flex items-center justify-center overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${artistData.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-110 opacity-80" : "scale-100 opacity-30"
        }`}
        style={{
          backgroundImage: "var(--image-url)",
        }}
      ></div>
      <RxOpenInNewWindow size={25} />
    </a>
  );
};

const TrackPreviewSm = ({ spotify, trackData }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={trackData.external_urls.spotify}
      className="relative h-[50px] flex items-center justify-center rounded overflow-hidden border border-gray-400/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${trackData.album.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-105 opacity-70" : "scale-100 opacity-20"
        }`}
        style={{
          backgroundImage: "var(--image-url)",
        }}
      ></div>
      <h3 className="text-sm relative whitespace-nowrap text-center truncate ... max-w-[90%]">
        {trackData.album.name}
      </h3>
    </a>
  );
};

const AlbumPreviewSm = ({ spotify, albumData }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={albumData.album.external_urls.spotify}
      className="relative h-[50px] flex items-center justify-center rounded overflow-hidden border border-gray-400/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${albumData.album.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-105 opacity-70" : "scale-100 opacity-20"
        }`}
        style={{
          backgroundImage: "var(--image-url)",
        }}
      ></div>
      <h3 className="z-[5] font-bold text-xl relative whitespace-nowrap text-center truncate ... max-w-[90%]">
        {albumData.album.name}
      </h3>
    </a>
  );
};

const SideBar = ({ spotify }) => {
  const [userData, setUserData] = useState(null);
  const [savedAlbums, setSavedAlbums] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    spotify.getMe().then((data) => setUserData(data));
    spotify.getMySavedAlbums({ limit: 4 }).then((data) => setSavedAlbums(data));
    spotify.getMyTopTracks({ limit: 5 }).then((data) => setTopTracks(data));
    spotify.getMyTopArtists({ limit: 10 }).then((data) => setTopArtists(data));
  }, [spotify]);

  if (!userData || !savedAlbums || !topTracks || !topArtists) {
    return <div></div>;
  }
  const currentPage = window.location.pathname;

  return (
    <aside className="fixed lef-0 h-screen w-sidebar bg-secondary-button z-[10] p-4 flex flex-col gap-5">
      <header className="flex gap-3">
        <a href={userData.external_urls.spotify}>
          <img
            className="h-[50px] rounded"
            src={userData.images[0] ? userData.images[0] : DefaultPFP}
            alt="Profile"
          />
        </a>
        <div className="flex flex-col leading-tight">
          <p className="text-white/30 text-xs">Welcome Back</p>
          <p className="text-lg">{userData.display_name}</p>
        </div>
      </header>
      <nav className="grid grid-cols-3 gap-3 text-xl">
        {mainPages.map((page, index) => (
          <a
            key={index}
            href={page.href}
            className={`flex items-center justify-center gap-3 bg-white/10 py-2 rounded ${
              page.href === currentPage
                ? "text-text drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
                : "text-text/50 hover:text-text hover:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
            }`}
          >
            <div>{page.icon}</div>
          </a>
        ))}
      </nav>
      <div>
        <h2 className="text-xl font-bold">Saved Albums</h2>
        <ul className="flex flex-col gap-2">
          {savedAlbums.items.map((albumData, index) => (
            <li key={index}>
              <AlbumPreviewSm spotify={spotify} albumData={albumData} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold">Favourite Tracks</h2>
        <ul className="grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            {topTracks.items.slice(1, 3).map((trackData, index) => (
              <li key={index}>
                <TrackPreviewSm spotify={spotify} trackData={trackData} />
              </li>
            ))}
          </div>
          <li>
            <TrackPreviewSm spotify={spotify} trackData={topTracks.items[0]} />
          </li>
          <div className="grid grid-cols-2">
            <li className="row-span-">
              <TrackPreviewSm
                spotify={spotify}
                trackData={topTracks.items[3]}
              />
            </li>
          </div>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold">Artists</h2>
        <ul className="grid grid-cols-4 gap-2">
          {topArtists.items.slice(0, 4).map((artistData, index) => (
            <li key={index}>
              <ArtistPreviewSm artistData={artistData} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
