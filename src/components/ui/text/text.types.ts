import { TextProps as RNTextProps } from "react-native";

// Font family types
export type FontFamily = "ClashGrotesk";

// ClashGrotesk font weights (based on available variants)
export type ClashGroteskFontWeight =
  | "200" // ExtraLight
  | "300" // Light
  | "400" // Regular
  | "500" // Medium
  | "600" // SemiBold
  | "700"; // Bold

// Font weight union
export type FontWeight = ClashGroteskFontWeight;

// Font style for italic variants (only available for Poppins)
export type FontStyle = "normal";

// Extended TextProps with font configuration
export interface TextProps extends RNTextProps {
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  fontSize?: number;
}
