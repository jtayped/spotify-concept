export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/home";
const clientID = "945b1191612c4ba6953e1cfe07a20fcd";
const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
];

export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${encodeURIComponent(
  redirectURI
)}&scope=${encodeURIComponent(
  scopes.join(" ")
)}&response_type=token&show_dialog=true`;

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};