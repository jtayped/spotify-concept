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
      className="relative h-[90px] rounded-full flex items-center justify-center overflow-hidden bg-secondary-button border border-gray-400/30 shadow"
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
      className="relative h-[50px] flex items-center justify-center rounded overflow-hidden bg-secondary-button border border-gray-400/30 shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${trackData.album.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-105 opacity-50" : "scale-100 opacity-20"
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
      className="relative h-[50px] flex items-center justify-center rounded overflow-hidden bg-secondary-button border border-gray-400/30 shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        "--image-url": `url(${albumData.album.images[0].url})`,
      }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover rounded transition-all duration-300 transform ${
          isHovered ? "scale-105 opacity-50" : "scale-100 opacity-20"
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
    <aside className="fixed lef-0 h-screen w-sidebar bg-secondary-button z-[10] p-4 flex flex-col gap-5 text-text/90 border-r border-gray-500/30 overflow-hidden">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-10 blur-[10px]"
        src={topTracks.items[0].album.images[0].url}
        alt=""
      />
      <div className="flex flex-col gap-3">
        <header className="flex gap-3 bg-white/10 p-2 rounded-md backdrop-blur-sm border border-gray-200/20">
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
        <nav className="grid grid-cols-3 gap-3 text-xl bg-white/10 p-2 rounded-md border backdrop-blur-sm border-gray-200/10">
          {mainPages.map((page, index) => (
            <a
              key={index}
              href={page.href}
              className={`flex items-center justify-center gap-3 bg-white/10 py-2 rounded backdrop-blur transition-all duration-200 ${
                page.href === currentPage
                  ? "text-text drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
                  : "text-text/50 hover:text-text hover:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
              }`}
            >
              <div>{page.icon}</div>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-gray-200/10">
          <h2 className="text-xl font-bold">Saved Albums</h2>
          <ul className="flex flex-col gap-2">
            {savedAlbums.items.map((albumData, index) => (
              <li key={index}>
                <AlbumPreviewSm spotify={spotify} albumData={albumData} />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-gray-200/10">
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
              <TrackPreviewSm
                spotify={spotify}
                trackData={topTracks.items[0]}
              />
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
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-gray-200/10">
          <h2 className="text-xl font-bold">Artists</h2>
          <ul className="grid grid-cols-4 gap-2">
            {topArtists.items.slice(0, 4).map((artistData, index) => (
              <li key={index}>
                <ArtistPreviewSm artistData={artistData} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
