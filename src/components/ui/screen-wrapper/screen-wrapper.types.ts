import { ScrollViewProps, StatusBarProps } from "react-native";
import { ViewProps } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export interface ScreenWrapperProps extends ViewProps, ScrollViewProps {
  insets?: (keyof EdgeInsets)[];
  insetVertical?: boolean;
  insetHorizontal?: boolean;
  scrollable?: boolean;
  statusBarProps?: StatusBarProps;
}
