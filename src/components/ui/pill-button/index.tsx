import React, { useCallback, useMemo } from "react";
import { Pressable, ViewStyle } from "react-native";
import {
  convertLineHeightToPixels,
  horizontalScale,
  verticalScale,
} from "@/utils/metrics";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import {
  PillButtonProps,
  PillButtonSize,
  PillButtonVariant,
} from "./pill-button.types";

const PillButton: React.FC<PillButtonProps> = ({
  text,
  textProps,
  onPress,
  variant = "default",
  size = "small",
  icon,
  iconPosition = "right",
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getButtonStyles = useCallback((): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 12,
      opacity: disabled ? 0.6 : 1,
      alignSelf: "flex-start",
    };

    // Size variations
    const sizeStyles: Record<PillButtonSize, ViewStyle> = {
      small: {
        paddingHorizontal: horizontalScale(8),
        paddingVertical: verticalScale(4.5),
      },
      medium: {
        paddingHorizontal: horizontalScale(12),
        paddingVertical: verticalScale(8),
      },
      large: {
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(12),
      },
    };

    // Variant styles
    const variantStyles: Record<PillButtonVariant, ViewStyle> = {
      default: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E4E9F2",
      },
      primary: {
        backgroundColor: colors.primary500,
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: colors.inputContainer,
        borderWidth: 1,
        borderColor: colors.label,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.gray500,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  }, [size, variant]);

  const getTextColor = useCallback((): string => {
    switch (variant) {
      case "primary":
        return colors.buttonText;
      case "secondary":
        return colors.gray500;
      case "outline":
        return colors.gray500;
      case "default":
      default:
        return colors.tertiary500;
    }
  }, []);

  const getTextSize = useCallback((): number => {
    switch (size) {
      case "small":
        return 10;
      case "medium":
        return 12;
      case "large":
        return 14;
      default:
        return 10;
    }
  }, []);

  const renderContent = useCallback(() => {
    const textComponent = (
      <Text
        fontWeight="500"
        fontSize={getTextSize()}
        lineHeight={convertLineHeightToPixels(150, getTextSize())}
        color={getTextColor()}
        style={textStyle}
        {...textProps}
      >
        {text}
      </Text>
    );

    if (!icon) {
      return textComponent;
    }

    return iconPosition === "left" ? (
      <>
        {icon}
        {textComponent}
      </>
    ) : (
      <>
        {textComponent}
        {icon}
      </>
    );
  }, [iconPosition, text, icon]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[getButtonStyles(), style]}
    >
      {renderContent()}
    </Pressable>
  );
};

export default PillButton;
