import { Text, Pressable } from "react-native";
import React from "react";
const PlaceDescription = ({ title, description, pressHandler, id, active }) => {
  return (
    <Pressable
      onPress={() => {
        pressHandler(id + 1);
      }}
      style={{
        borderWidth: 1,
        width: "100%",
        marginVertical: 10,
        borderColor: Number(active) === id + 1 ? "#0244d0" : "rgba(0,0,0,0.2)",
        elevation: Number(active) == id + 1 ? 2 : 1,
        borderRadius: 10,
        paddingVertical: description ? 5 : 15,
        paddingHorizontal: 20,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "900" }}>{title}</Text>
      {description && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "100",
            color: "rgba(0,0,0,0.7)",
          }}
        >
          {description}
        </Text>
      )}
    </Pressable>
  );
};

export default PlaceDescription;
