import { ScrollView, StatusBar, View } from "react-native";
import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import styles from "./screen-wrapper.styles";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import { ScreenWrapperProps } from "./screen-wrapper.types";

const ScreenWrapper = ({
  insets,
  insetVertical,
  insetHorizontal,
  scrollable = true,
  statusBarProps,
  style,
  ...props
}: ScreenWrapperProps) => {
  const { colors } = useTheme();
  const { top, bottom, left, right } = useSafeAreaInsets();

  // Extract padding values from style prop if provided
  const checkForPadding = useCallback(() => {
    if (!style) return { top: false, bottom: false, left: false, right: false };

    const styleArray = Array.isArray(style) ? style : [style];
    const flattenedStyle = styleArray.reduce((acc, curr) => {
      if (curr && typeof curr === "object") {
        return { ...acc, ...curr };
      }
      return acc;
    }, {} as any);

    return {
      top:
        flattenedStyle?.paddingTop !== undefined ||
        flattenedStyle?.paddingVertical !== undefined ||
        flattenedStyle?.padding !== undefined,
      bottom:
        flattenedStyle?.paddingBottom !== undefined ||
        flattenedStyle?.paddingVertical !== undefined ||
        flattenedStyle?.padding !== undefined,
      left:
        flattenedStyle?.paddingLeft !== undefined ||
        flattenedStyle?.paddingHorizontal !== undefined ||
        flattenedStyle?.padding !== undefined,
      right:
        flattenedStyle?.paddingRight !== undefined ||
        flattenedStyle?.paddingHorizontal !== undefined ||
        flattenedStyle?.padding !== undefined,
    };
  }, [style]);

  const hasPadding = checkForPadding();

  if (scrollable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
          style,
        ]}
        {...props}
      >
        {statusBarProps && <StatusBar {...statusBarProps} />}

        {props.children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: !hasPadding.top
            ? verticalScale(insets?.includes("top") || insetVertical ? top : 0)
            : undefined,
          paddingBottom: !hasPadding.bottom
            ? verticalScale(
                insets?.includes("bottom") || insetVertical ? bottom : 0
              )
            : undefined,
          paddingLeft: !hasPadding.left
            ? horizontalScale(
                insets?.includes("left") || insetHorizontal ? left : 0
              )
            : undefined,
          paddingRight: !hasPadding.right
            ? horizontalScale(
                insets?.includes("right") || insetHorizontal ? right : 0
              )
            : undefined,
        },
        style,
      ]}
      {...props}
    >
      {statusBarProps && <StatusBar {...statusBarProps} />}

      {props.children}
    </View>
  );
};

export default ScreenWrapper;
