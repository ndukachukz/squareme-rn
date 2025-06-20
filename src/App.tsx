import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { useFonts } from "expo-font";
import { FONT_LOADING_MAP } from "./constants/fonts";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const [loaded, error] = useFonts(FONT_LOADING_MAP);

  const onLayoutRootView = React.useCallback(async () => {
    if (loaded || error) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Navigation
      theme={theme}
      linking={{
        enabled: "auto",
        prefixes: ["squareme://"],
      }}
      onReady={onLayoutRootView}
    />
  );
}
