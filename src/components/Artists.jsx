// React Util
import React from "react";

const Artists = ({ artists }) => {
  return (
    <ol className="text-xs gap-1">
      {artists.map((artist, index) => (
        <React.Fragment key={artist.id}>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={artist.external_urls.spotify}
              className="hover:underline"
            >
              {artist.name}
            </a>
            {index !== artists.length - 1 && ", "}
          </li>
        </React.Fragment>
      ))}
    </ol>
  );
};

export default Artists;
