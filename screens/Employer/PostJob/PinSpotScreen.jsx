import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { PostJobContext } from "./PostJobScreen";

import { MAPBOXTOKEN, MAPBOXURI } from "../../../urls";

const PinSpotScreen = ({ navigation, route }) => {
  const dimen = useWindowDimensions();
  let cntr;
  cntr = route.params.center;
  const [isLoaded, setIsLoaded] = useState(false);
  const [center, setCenter] = useState(cntr || [11, 21]);
  const [region, setRegion] = useState("");
  const [placeName, setPlaceName] = useState("");
  const { dispatch } = useContext(PostJobContext);
  useEffect(() => {
    (async function () {
      const result =
        await fetch(`${MAPBOXURI}/geocode/reverse?lat=${cntr[1]}&lon=${cntr[0]}&format=json&apiKey=${MAPBOXTOKEN}
    `);
      const data = await result.json();
      setRegion(data.results[0].state);
      setPlaceName(data.results[0].formatted);
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=${dimen.width}&height=${dimen.height}&center=lonlat:${cntr[0]},${cntr[1]}&zoom=14&marker=lonlat:${cntr[0]},${cntr[1]};color:%23ff0000;size:medium&apiKey=${MAPBOXTOKEN}`,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 2,
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          flexDirection: "row",
          justifyContent: "flex-end",
          borderColor: "rgba(0,0,0,0.3)",
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            dispatch({
              type: "add",
              payload: {
                center: center,
                placeName,
                region,
              },
            });
            navigation.navigate("employer/postjob/payment");
          }}
          style={{
            backgroundColor: "#0244d0",
            width: 100,
            paddingHorizontal: 10,
            marginRight: 10,

            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PinSpotScreen;

// import {
//   View,
//   Text,
//   ActivityIndicator,
//   TouchableOpacity,
//   StatusBar,
//   Image,
//   useWindowDimensions,
// } from "react-native";
// import React, { useContext, useState, useEffect } from "react";
// import MapView, { Marker } from "react-native-maps";
// import { PostJobContext } from "./PostJobScreen";
// import { MAPBOXTOKEN, MAPBOXURI } from "../../../urls";

// const PinSpotScreen = ({ navigation, route }) => {
//   const dimen = useWindowDimensions();
//   const [cntr, setcntr] = useState(route.params.center || [11, 21]);
//   const { dispatch } = useContext(PostJobContext);
//   const [region, setRegion] = useState("");
//   const [placeName, setPlaceName] = useState("");
//   useEffect(() => {
//     (async function () {
//       const result =
//         await fetch(`${MAPBOXURI}/geocode/reverse?lat=${cntr[1]}&lon=${cntr[0]}&format=json&apiKey=${MAPBOXTOKEN}
//     `)();
//       const data = await result.json();
//       setRegion(data.results[0].state);
//       setPlaceName(data.results[0].formatted);
//     })();
//   }, []);
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.02)",
//       }}
//     >
//       <View style={{ flex: 1 }}>
//         <Image
//           onLayout={() => <ActivityIndicator />}
//           style={{ flex: 1 }}
//           source={{
//             uri: `${MAPBOXURI}/staticmap?style=osm-carto&width=${dimen.width}&height=${dimen.height}&center=lonlat:${cntr[0]},${cntr[1]}&zoom=14&marker=lonlat:${cntr[0]},${cntr[1]};color:%23ff0000;size:medium&apiKey=${MAPBOXTOKEN}`,
//           }}
//         />
//       </View>
//       <View
//         style={{
//           backgroundColor: "#fff",
//           borderTopWidth: 2,
//           alignItems: "flex-end",
//           height: 60,
//           justifyContent: "center",
//           borderColor: "rgba(0,0,0,0.3)",
//         }}
//       >
//         <TouchableOpacity
//           onPress={async () => {
//             dispatch({
//               type: "add",
//               payload: {
//                 center: cntr,
//                 placeName,
//                 region,
//               },
//             });
//             navigation.navigate("employer/postjob/payment");
//           }}
//           style={{
//             backgroundColor: "#0244d0",
//             width: 100,
//             right: 20,
//             paddingHorizontal: 10,
//             paddingVertical: 5,
//             borderRadius: 5,
//           }}
//         >
//           <Text style={{ textAlign: "center", color: "#fff" }}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default PinSpotScreen;
