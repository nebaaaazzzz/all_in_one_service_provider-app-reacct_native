import { Provider as PaperProvider } from "react-native-paper";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "./assets/Theme";
import AppNavigator from "./App.Navigator";
import React, { useEffect } from "react";

const queryClient = new QueryClient();
export default function App() {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <MaterialCommunityIcons {...props} />,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={"...loading"}>
          <AppNavigator />
        </React.Suspense>
      </QueryClientProvider>
    </PaperProvider>
  );
}
