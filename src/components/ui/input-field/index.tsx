import { View } from "react-native";
import React from "react";
import styles from "./input-field.styles";
import { InputFieldProps } from "./input-field.types";
import Input from "../input";
import { useTheme } from "@/hooks/useTheme";
import Text from "../text";

const InputField = ({ label, error, ...inputProps }: InputFieldProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.gray500 }]} fontSize={15}>
          {label}
        </Text>
      )}
      <Input {...inputProps} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;
