import React from "react";
import { TextInput, View } from "react-native";
import styles from "./input.styles";
import { InputProps } from "./input.types";
import { useTheme } from "@/hooks/useTheme";
import { verticalScale } from "@/utils/metrics";

const Input = ({
  leftComponent,
  rightComponent,
  editable = true,
  inputContainerStyle,
  textArea,
  ...textInputProps
}: InputProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { minHeight: textArea ? verticalScale(81) : verticalScale(54) },
        inputContainerStyle,
      ]}
    >
      {leftComponent && (
        <View style={styles.leftComponent}>{leftComponent}</View>
      )}
      <TextInput
        multiline={textArea}
        style={[
          styles.input,
          { color: editable ? colors.gray500 : colors.gray300 },
        ]}
        editable={editable}
        numberOfLines={textArea ? 10 : undefined}
        {...textInputProps}
      />
      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

export default Input;
