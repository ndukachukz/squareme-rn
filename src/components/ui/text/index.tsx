import React from "react";
import { Text as RNText } from "react-native";
import { TextProps } from "./text.types";
import styles, { getFontFamily } from "./text.styles";
import { moderateScale } from "@/utils/metrics";

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
  ...props
}) => {
  const computedStyle = {
    fontFamily: getFontFamily(fontFamily, fontWeight, fontStyle),
    fontSize: moderateScale(fontSize),
  };

  return (
    <RNText style={[styles.text, computedStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
export * from "./text.types";
