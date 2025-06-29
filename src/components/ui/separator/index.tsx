import React from "react";
import { View, StyleSheet } from "react-native";
import { SeparatorProps } from "./separator.types";

const Separator: React.FC<SeparatorProps> = ({
  height = 1,
  backgroundColor = "#F4F5F5",
  style,
}) => {
  return (
    <View
      style={[
        styles.separator,
        {
          height,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    width: "100%",
  },
});
