import { useThemeStore } from "../store";
import { themes } from "../constants/theme";

export const useTheme = () => {
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
