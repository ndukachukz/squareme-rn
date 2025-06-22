import { useAppSelector } from "@/store/hooks";
import { themes } from "@/constants/theme";

export const useTheme = () => {
  const currentTheme = useAppSelector((state) => state.theme.theme);

  const colors = currentTheme === "dark" ? themes.dark : themes.light;

  return {
    theme: currentTheme,
    colors,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
  };
};
