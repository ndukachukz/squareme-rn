import { TextInputProps } from "react-native";
import { ReactNode } from "react";

export interface InputProps extends TextInputProps {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}
