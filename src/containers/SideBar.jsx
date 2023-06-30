// React Util
import React, { useEffect, useState } from "react";

// Images
import DefaultPFP from "../assets/images/defaultPfp.jpg";

// Constants
import { mainPages } from "../constants/nav";

// JSX Components
import { AlbumPreviewSm, TrackPreviewSm, ArtistPreviewSm } from "../components";

const SideBar = ({ spotify }) => {
  const [userData, setUserData] = useState(null);
  const [savedAlbums, setSavedAlbums] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    spotify.getMe().then((data) => setUserData(data));
    spotify.getMySavedAlbums({ limit: 3 }).then((data) => setSavedAlbums(data));
    spotify.getMyTopTracks({ limit: 10 }).then((data) => {
      setTopTracks(data);
      const randomIndex = Math.floor(Math.random() * data.items.length);
      setBackgroundImage(data.items[randomIndex].album.images[0].url);
    });
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
        src={backgroundImage}
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
                <AlbumPreviewSm albumData={albumData} />
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
                  <TrackPreviewSm trackData={trackData} />
                </li>
              ))}
            </div>
            <li>
              <TrackPreviewSm
                spotify={spotify}
                trackData={topTracks.items[0]}
              />
            </li>
            {topTracks.items.slice(3, 5).map((trackData, index) => (
              <li key={index}>
                <TrackPreviewSm trackData={trackData} />
              </li>
            ))}
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
