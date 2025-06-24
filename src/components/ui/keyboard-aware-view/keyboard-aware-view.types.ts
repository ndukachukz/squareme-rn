import { ReactNode } from "react";
import { ViewStyle, ScrollViewProps } from "react-native";

export interface KeyboardAwareViewProps extends ScrollViewProps {
  enableOnAndroid?: boolean;
  enableAutomaticScroll?: boolean;
  extraHeight?: number;
  extraScrollHeight?: number;
  resetScrollToCoords?: { x: number; y: number };
  viewIsInsideTabBar?: boolean;
  innerRef?: (ref: any) => void;
  onKeyboardWillShow?: () => void;
  onKeyboardWillHide?: () => void;
  onKeyboardDidShow?: (frames: any) => void;
  onKeyboardDidHide?: () => void;
}

export interface KeyboardState {
  keyboardHeight: number;
  isKeyboardVisible: boolean;
}
