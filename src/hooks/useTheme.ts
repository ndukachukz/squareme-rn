import { useThemeStore } from "../store";
import { themes } from "../constants/theme";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const { theme: currentTheme, setTheme, toggleTheme } = useThemeStore();

  const colors = currentTheme === "dark" ? themes.dark : themes.light;

  return {
    theme: currentTheme,
    colors,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    setTheme,
    toggleTheme,
  };
};
