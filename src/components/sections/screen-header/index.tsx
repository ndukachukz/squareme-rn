import { StyleSheet, View } from "react-native";
import React from "react";
import { ScreenHeaderProps } from "./screen-header.types";

import Text from "@/components/ui/text";
import {
  convertLineHeightToPixels,
  horizontalScale,
  verticalScale,
} from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";

const ScreenHeader = (props: ScreenHeaderProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
        props.containerStyle,
      ]}
    >
      {props.headerLeft}
      <Text fontSize={20} fontWeight="500" style={styles.title}>
        {props.title}
      </Text>
      {props.headerRight}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(13),
    flexDirection: "row",
    alignItems: "center",
    columnGap: horizontalScale(29),
  },
  title: {
    lineHeight: convertLineHeightToPixels(140, 20),
  },
});
