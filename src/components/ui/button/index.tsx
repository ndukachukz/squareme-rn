import React, { useCallback } from "react";
import { View, Pressable, TouchableOpacity, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { gradients } from "@/constants/theme";
import { ButtonProps } from "./button.types";
import Text from "@/components/ui/text";
import { moderateScale, verticalScale, horizontalScale } from "@/utils/metrics";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  touchEffect = true,
  disabled = false,
  onPress,
  style,
  textFontFamily = "ClashGrotesk",
  textFontWeight = "400",
  textFontStyle = "normal",
  textFontSize = 15,
  textColor,
}) => {
  const { colors } = useTheme();

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: moderateScale(8),
      paddingVertical: verticalScale(18),
      //   paddingHorizontal: horizontalScale(20),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.disabled : colors.primary500,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.disabled : colors.inputContainer,
          borderWidth: 1,
          borderColor: colors.label,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.gray500,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case "primary":
        return colors.buttonText;
      case "secondary":
        return colors.gray500;
      case "outline":
        return colors.gray500;
      case "ghost":
        return colors.gray500;
      default:
        return colors.buttonText;
    }
  };

  const renderContent = () => (
    <Text
      fontFamily={textFontFamily}
      fontWeight={textFontWeight}
      fontStyle={textFontStyle}
      fontSize={textFontSize}
      style={{
        color: textColor ?? getTextColor(),
        textAlign: "center",
      }}
    >
      {title}
    </Text>
  );

  if (touchEffect) {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={onPress}
        style={[getButtonStyles(), style]}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[getButtonStyles(), style]}
    >
      {renderContent()}
    </Pressable>
  );
};

export default Button;
