import React from "react";
import { Text as RNText, TextStyle } from "react-native";
import { TextProps } from "./text.types";
import styles, { getFontFamily } from "./text.styles";
import {
  convertLineHeightStringToPixels,
  convertLineHeightToPixels,
  moderateScale,
} from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";

/**
 * A typesafe Text component with built-in font family and weight support.
 * Supports ClashGrotesk font family with full TypeScript intellisense.
 *
 * @example
 * // Basic usage with ClashGrotesk (default)
 * <Text fontWeight="600">
 *   SemiBold ClashGrotesk Text
 * </Text>
 *
 * @example
 * // With custom styling
 * <Text
 *   fontFamily="ClashGrotesk"
 *   fontWeight="500"
 *   fontSize={18}
 *   style={{ color: '#ff6b6b' }}
 * >
 *   Medium ClashGrotesk with custom color and size
 * </Text>
 *
 * @example
 * // Available ClashGrotesk weights: "200", "300", "400", "500", "600", "700"
 * // Font styles: "normal"
 */
export const Text: React.FC<TextProps> = ({
  fontFamily = "ClashGrotesk",
  fontWeight = "400",
  fontStyle = "normal",
  fontSize = 16,
  style,
  children,
  lineHeight,
  ...props
}) => {
  const { colors } = useTheme();
  const computedStyle: TextStyle = {
    fontFamily: getFontFamily(fontFamily, fontWeight, fontStyle),
    fontSize: moderateScale(fontSize),
    color: colors.gray500,
    lineHeight,
  };

  return (
    <RNText style={[styles.text, computedStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
export * from "./text.types";
