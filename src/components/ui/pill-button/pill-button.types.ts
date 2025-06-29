import { ReactNode } from "react";
import { ViewStyle, TextStyle } from "react-native";
import { TextProps } from "../text";

export type PillButtonVariant = "default" | "primary" | "secondary" | "outline";
export type PillButtonSize = "small" | "medium" | "large";
export type IconPosition = "left" | "right";

export interface PillButtonProps {
  text: string;
  textProps?: Omit<TextProps, "children">;
  onPress?: () => void;
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
