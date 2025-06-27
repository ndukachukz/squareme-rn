import { View, ViewProps } from "react-native";
import React from "react";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import styles from "./screen-wrapper.styles";
import { horizontalScale, verticalScale } from "@/utils/metrics";

interface ScreenWrapperProps extends ViewProps {
  insets?: keyof EdgeInsets;
}

const ScreenWrapper = ({ insets, ...props }: ScreenWrapperProps) => {
  const { colors } = useTheme();
  const { top, bottom, left, right } = useSafeAreaInsets();
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
