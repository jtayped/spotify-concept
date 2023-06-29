import React, { useEffect, useState } from "react";

// Images
import DefaultPFP from "../assets/images/defaultPfp.jpg";

// Constants
import { mainPages } from "../constants/nav";

const AlbumArtist = ({ spotify, artistData }) => {
  const [artist, setArtist] = useState({});

  useEffect(() => {
    spotify.getArtist(artistData.id).then((data) => setArtist(data));
  }, [spotify, artistData.id]);

  if (Object.keys(artist).length === 0) {
    return <div></div>;
  }
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={artist.external_urls.spotify}
      className="hover:underline truncate ... flex items-center gap-1"
    >
      {artist.images ? (
        <img
          className="h-4 rounded-sm"
          src={artist.images[0].url}
          alt={artist.name}
        />
      ) : null}
      <p>{artist.name}</p>
    </a>
  );
};

const AlbumPreviewSm = ({ spotify, albumData }) => {
  return (
    <div className="flex gap-3">
      <a href={albumData.album.external_urls.spotify}>
        <img
          className="h-10 rounded"
          src={albumData.album.images[0].url}
          alt="Album"
        />
      </a>

      <div className="overflow-hidden">
        <a href={albumData.album.external_urls.spotify}>
          <h3 className="whitespace-nowrap max-w-[175px] truncate ...">
            {albumData.album.name}
          </h3>
        </a>
        <li className="text-xs font-thin text-text/50">
          <AlbumArtist
            spotify={spotify}
            artistData={albumData.album.artists[0]}
          />
        </li>
      </div>
    </div>
  );
};

const SideBar = ({ spotify }) => {
  const [userData, setUserData] = useState({});
  const [savedAlbums, setSavedAlbums] = useState({});
  const [topTracks, setTopTracks] = useState({});

  useEffect(() => {
    spotify.getMe().then((data) => setUserData(data));
    spotify.getMySavedAlbums().then((data) => setSavedAlbums(data));
    spotify.getMyTopTracks({ limit: 5 }).then((data) => setTopTracks(data));
  }, [spotify]);

  if (Object.keys(savedAlbums).length === 0) {
    return <div></div>;
  }
  const currentPage = window.location.pathname;

  return (
    <aside className="fixed lef-0 h-screen w-sidebar bg-secondary-button z-[10] p-4 flex flex-col gap-7">
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
      <nav className="flex flex-col gap-3 text-lg">
        {mainPages.map((page, index) => (
          <a
            key={index}
            href={page.href}
            className={`flex items-center gap-3 ${
              page.href === currentPage
                ? "text-text drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
                : "text-text/50 hover:text-text hover:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]"
            }`}
          >
            <div className="text-2xl">{page.icon}</div>
            <p className="text-xs">{page.name}</p>
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-1 bg-white/5 p-1.5 rounded">
          <h2 className="text-xl font-bold ml-1">Your Albums</h2>
          {savedAlbums.items.map((album, index) => (
            <li key={index} className="hover:bg-white/10 p-1 rounded">
              <AlbumPreviewSm spotify={spotify} albumData={album} />
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-1 bg-white/5 p-1.5 rounded">
          <h2 className="text-xl font-bold ml-1">Your Favourite Tracks</h2>
          {topTracks.items.map((album, index) => (
            <li key={index} className="hover:bg-white/10 p-1 rounded">
              <AlbumPreviewSm spotify={spotify} albumData={album} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
