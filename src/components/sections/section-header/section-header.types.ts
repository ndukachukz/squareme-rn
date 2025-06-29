import { StyleProp, ViewStyle } from "react-native";

export interface SectionHeaderProps {
  title: string;
  titleColor?: string;
  actionText?: string;
  onActionPress?: () => void;
  titleFontSize?: number;
  actionFontSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}
