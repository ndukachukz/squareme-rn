import { ViewStyle } from "react-native";
import {
  FontFamily,
  FontWeight,
  FontStyle,
} from "@/components/ui/text/text.types";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonType = "solid";

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  type?: ButtonType;
  touchEffect?: boolean;
  disabled?: boolean;

  onPress?: () => void;
  style?: ViewStyle;

  // Text customization props
  textFontFamily?: FontFamily;
  textFontWeight?: FontWeight;
  textFontStyle?: FontStyle;
  textFontSize?: number;
  textColor?: string;
}
