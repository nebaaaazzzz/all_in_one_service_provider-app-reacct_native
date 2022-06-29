import { View, Text } from "react-native";
import React, { createContext } from "react";
const JobContext = createContext();
const JobContextProvider = (props) => {
  const [value, setValue] = useState([]);
  return (
    <JobContext.Provider value={value}>{props.children}</JobContext.Provider>
  );
};

export default JobContextProvider;
