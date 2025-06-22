import React from "react";
import { TextInput, View } from "react-native";
import styles from "./input.styles";
import { InputProps } from "./input.types";
import { useTheme } from "@/hooks/useTheme";

const Input = ({
  leftComponent,
  rightComponent,
  ...textInputProps
}: InputProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {leftComponent && (
        <View style={styles.leftComponent}>{leftComponent}</View>
      )}
      <TextInput
        style={[styles.input, { color: colors.gray500 }]}
        {...textInputProps}
      />
      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

export default Input;
