export const FONTS = {
  CLASH_GROTESK_EXTRALIGHT: "ClashGrotesk-Extralight",
  CLASH_GROTESK_LIGHT: "ClashGrotesk-Light",
  CLASH_GROTESK_REGULAR: "ClashGrotesk-Regular",
  CLASH_GROTESK_MEDIUM: "ClashGrotesk-Medium",
  CLASH_GROTESK_SEMIBOLD: "ClashGrotesk-Semibold",
  CLASH_GROTESK_BOLD: "ClashGrotesk-Bold",
} as const;

export type FontFamilyType = (typeof FONTS)[keyof typeof FONTS];

export const FONT_LOADING_MAP = {
  [FONTS.CLASH_GROTESK_EXTRALIGHT]: require("../../assets/fonts/ClashGrotesk-Extralight.otf"),
  [FONTS.CLASH_GROTESK_LIGHT]: require("../../assets/fonts/ClashGrotesk-Light.otf"),
  [FONTS.CLASH_GROTESK_REGULAR]: require("../../assets/fonts/ClashGrotesk-Regular.otf"),
  [FONTS.CLASH_GROTESK_MEDIUM]: require("../../assets/fonts/ClashGrotesk-Medium.otf"),
  [FONTS.CLASH_GROTESK_SEMIBOLD]: require("../../assets/fonts/ClashGrotesk-Semibold.otf"),
  [FONTS.CLASH_GROTESK_BOLD]: require("../../assets/fonts/ClashGrotesk-Bold.otf"),
} as const;
