import { StyleSheet } from "react-native";
import { FontFamily, FontWeight, FontStyle } from "./text.types";
import { FONTS } from "@/constants/fonts";

// Font family name mapping utility
export const getFontFamily = (
  fontFamily: FontFamily = "ClashGrotesk",
  fontWeight: FontWeight = "400",
  fontStyle: FontStyle = "normal"
): string => {
  if (fontFamily === "ClashGrotesk") {
    const weightMap: Record<string, string> = {
      "200": FONTS.CLASH_GROTESK_EXTRALIGHT,
      "300": FONTS.CLASH_GROTESK_LIGHT,
      "400": FONTS.CLASH_GROTESK_REGULAR,
      "500": FONTS.CLASH_GROTESK_MEDIUM,
      "600": FONTS.CLASH_GROTESK_SEMIBOLD,
      "700": FONTS.CLASH_GROTESK_BOLD,
    };

    return weightMap[fontWeight] || FONTS.CLASH_GROTESK_REGULAR;
  }

  return FONTS.CLASH_GROTESK_REGULAR; // fallback to ClashGrotesk Regular
};

export default StyleSheet.create({
  text: {
    fontFamily: getFontFamily(),
  },
});
