import { ButtonProps } from "@/components/ui/button/button.types";
import { TextProps } from "@/components/ui/text";
import { ImageProps } from "react-native";

export interface InfoScreenProps {
  infoImage: ImageProps;
  title: string;
  titleProps?: Omit<TextProps, "children">;
  description: string;
  descriptionProps?: Omit<TextProps, "children">;
  buttonText: string;
  buttonProps?: Omit<ButtonProps, "title">;
}
