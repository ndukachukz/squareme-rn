export const commonColors = {
  white: "#FFFFFF",
  black: "#000000",
  magenta: "#9F56D4",
  error500: "#F04438",
  error600: "#D92D20",
  tabBarBg: "#F9F9F9F0",
  success600: "#039855",
  lightGray: "#F9F9F9",
  basic700: "#2E3A59",
  secondary50: "#CCF4FE",
  secondary600: "#00A5D1",
  gray100: "#B7BABF",
  // Dashboard wallet card colors
  darkBlue: "#000942",
} as const;

const darkColors = {
  // Common colors
  ...commonColors,

  primary500: "",
  gray500: "",
  gray400: "",
  gray300: "",
  secondary300: "",
  secondary500: "",
  tertiary400: "",
  tertiary500: "",
  disabled: "#DBDCDF",

  // Background colors
  background: "#161622",

  // Text colors
  screenTitle: "#FFF",
  label: "#CDCDE0",
  inputText: "#FFF",
  primaryText: "#FF9001",
  buttonText: "#161622",
  secondaryText: "#CDCDE0",

  // Input colors
  inputContainer: "#1E1E2D",
  inputPlaceholder: "#7B7B8B",
  inputBorderActive: "#FF9C01",
  inputFieldBackground: "#F3F4F7",

  // border:
  borderSecondary: "#232533",

  // Navigation colors
  tabActive: "#FFA001",
  tabInactive: "#CDCDE0",

  // Indicator colors
  indicatorInactive: "#7B7B8B",
} as const;

const lightColors = {
  // Common colors
  ...commonColors,

  primary500: "#000A4A",
  gray500: "#120542",
  gray400: "#4C525E",
  gray300: "#70747E",
  secondary300: "#55D9FC",
  secondary500: "#00C6FB",
  tertiary400: "#AF72DB",
  tertiary500: "#9F56D4",

  disabled: "#DBDCDF",

  // Background colors
  background: "#ffffff",

  // Text colors
  screenTitle: "#161622",
  label: "#6b7280",
  inputText: "#161622",
  primaryText: "#FF9001",
  buttonText: "#ffffff",
  secondaryText: "#6b7280",

  // Input colors
  inputContainer: "#f8fafc",
  inputPlaceholder: "#9ca3af",
  inputBorderActive: "#FF9C01",
  inputFieldBackground: "#F3F4F7",

  // border:
  borderSecondary: "#232533",

  // Navigation colors
  tabActive: "#FFA001",
  tabInactive: "#6b7280",

  // Indicator colors
  indicatorInactive: "#DEDEDE",
} as const;

// Export dark colors as default for backwards compatibility
export const colors = darkColors;

export const themes = {
  dark: darkColors,
  light: lightColors,
} as const;

export const gradients = {
  button: ["#FF8C00", "#FFA300"],
} as const;

export const theme = {
  colors: darkColors, // Default to dark mode
  gradients,
} as const;

export type Theme = typeof theme;
export type Colors = typeof darkColors;
