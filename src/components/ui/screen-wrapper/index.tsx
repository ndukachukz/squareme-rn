import { ScrollView, StatusBar, View } from "react-native";
import React from "react";
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
  ...props
}: ScreenWrapperProps) => {
  const { colors } = useTheme();
  const { top, bottom, left, right } = useSafeAreaInsets();

  if (scrollable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
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
          paddingTop: verticalScale(
            insets?.includes("top") || insetVertical ? top : 0
          ),
          paddingBottom: verticalScale(
            insets?.includes("bottom") || insetVertical ? bottom : 0
          ),
          paddingLeft: horizontalScale(
            insets?.includes("left") || insetHorizontal ? left : 0
          ),
          paddingRight: horizontalScale(
            insets?.includes("right") || insetHorizontal ? right : 0
          ),
        },
      ]}
      {...props}
    >
      {statusBarProps && <StatusBar {...statusBarProps} />}

      {props.children}
    </View>
  );
};

export default ScreenWrapper;
