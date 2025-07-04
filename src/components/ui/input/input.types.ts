import { StyleProp, TextInputProps, ViewStyle } from "react-native";
import { ReactNode } from "react";

export interface InputProps extends TextInputProps {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  inputContainerStyle?: StyleProp<ViewStyle>;
  textArea?: boolean;
}
