import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { useFonts } from "expo-font";
import { FONT_LOADING_MAP } from "./constants/fonts";
import { SplashScreen as AnimatedSplashScreen } from "./components/screens/splash-screen";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./config/env";

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = React.useState(true);

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const [loaded, error] = useFonts(FONT_LOADING_MAP);

  const onLayoutRootView = React.useCallback(async () => {
    if (loaded || error) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const handleSplashFinish = React.useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!loaded && !error) {
    return null;
  }

  // Show animated splash screen first
  if (showSplash) {
    return <AnimatedSplashScreen onAnimationFinish={handleSplashFinish} />;
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <Navigation
          theme={theme}
          linking={{
            enabled: "auto",
            prefixes: ["squareme://"],
          }}
          onReady={onLayoutRootView}
        />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
