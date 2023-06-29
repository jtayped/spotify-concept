export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/home";
const clientID = "945b1191612c4ba6953e1cfe07a20fcd";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
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
