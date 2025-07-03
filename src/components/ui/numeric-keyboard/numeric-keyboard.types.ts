import { ViewStyle } from "react-native";

export interface NumericKeyboardProps {
  /**
   * Callback when a key is pressed
   */
  onKeyPress?: (key: string) => void;

  /**
   * Callback when delete key is pressed
   */
  onDelete?: () => void;

  /**
   * Custom style for the keyboard container
   */
  style?: ViewStyle;
}
