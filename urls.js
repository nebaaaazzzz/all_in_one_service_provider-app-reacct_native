import * as SecureStore from "expo-secure-store";
const BASEURI = `http://192.168.137.44:5000`;
let BASETOKEN;
(async () => {
  BASETOKEN = await SecureStore.getItemAsync("token");
})();
// const MAPBOXURI = `https://api.mapbox.com/geocoding/v5`;
// const MAPBOXTOKEN = `pk.eyJ1IjoibmViYWFhYXp6enoiLCJhIjoiY2w0bHB0bWVkMHJibDNmbzFpenA5dmRkbyJ9.jSio18EC3_YJ0EcxYsFx-w`;
const MAPBOXURI = "https://api.geoapify.com/v1/";
const MAPBOXTOKEN = "b546bfd3cc8e4021a35ef25c89a7cac9";
export { BASEURI, MAPBOXURI, BASETOKEN, MAPBOXTOKEN };
