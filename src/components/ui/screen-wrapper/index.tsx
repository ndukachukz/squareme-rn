import { ScrollView, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import styles from "./screen-wrapper.styles";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import { ScreenWrapperProps } from "./screen-wrapper.types";

const ScreenWrapper = ({
  insets,
  scrollable = true,
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
          paddingTop: verticalScale(insets === "top" ? top : 0),
          paddingBottom: verticalScale(insets === "bottom" ? bottom : 0),
          paddingLeft: horizontalScale(insets === "left" ? left : 0),
          paddingRight: horizontalScale(insets === "right" ? right : 0),
        },
      ]}
      {...props}
    >
      {props.children}
    </View>
  );
};

export default ScreenWrapper;
