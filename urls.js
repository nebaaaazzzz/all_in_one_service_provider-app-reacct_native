import * as SecureStore from "expo-secure-store";

const BASEURI = `https://c6f7-213-55-102-49.in.ngrok.io`;
let BASETOKEN;
(async () => {
  BASETOKEN = await SecureStore.getItemAsync("token");
})();
const MAPBOXURI = `https://api.mapbox.com/geocoding/v5`;
const MAPBOXTOKEN = `pk.eyJ1IjoibmViYWFhYXp6enoiLCJhIjoiY2w0bHB0bWVkMHJibDNmbzFpenA5dmRkbyJ9.jSio18EC3_YJ0EcxYsFx-w`;

export { BASEURI, MAPBOXURI, BASETOKEN, MAPBOXTOKEN };
