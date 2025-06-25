import { ButtonProps } from "@/components/ui/button/button.types";
import { TextProps } from "@/components/ui/text";
import { ImageProps, PressableProps } from "react-native";

export interface InfoScreenButton extends ButtonProps {}

export interface InfoScreenProps {
  infoImage?: ImageProps;
  title: string;
  titleProps?: Omit<TextProps, "children">;
  description: string;
  descriptionProps?: Omit<TextProps, "children">;

  // Legacy single button support (backward compatibility)
  buttonText?: string;
  buttonProps?: Omit<ButtonProps, "title">;

  // New multiple buttons support
  buttons?: InfoScreenButton[];
}
