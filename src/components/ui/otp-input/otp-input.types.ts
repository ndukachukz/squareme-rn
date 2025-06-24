import { TextInputProps, ViewStyle, KeyboardType } from "react-native";

export interface OTPInputProps
  extends Omit<
    TextInputProps,
    "value" | "onChangeText" | "maxLength" | "onChange"
  > {
  /**
   * Length of the OTP (number of input fields)
   * @default 6
   */
  length?: number;

  /**
   * Current OTP value
   * @default ''
   */
  value?: string;

  /**
   * Callback when OTP value changes
   */
  onChange?: (otp: string) => void;

  /**
   * Callback when OTP is complete (all fields filled)
   */
  onComplete?: (otp: string) => void;

  /**
   * Auto-focus first input on mount
   * @default true
   */
  autoFocus?: boolean;

  /**
   * Whether inputs are editable
   * @default true
   */
  editable?: boolean;

  /**
   * Show dots instead of actual characters
   * @default false
   */
  secureTextEntry?: boolean;

  /**
   * Keyboard type for inputs
   * @default 'numeric'
   */
  keyboardType?: KeyboardType;

  /**
   * Placeholder character for empty inputs
   * @default ''
   */
  placeholder?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Label text to display above inputs
   */
  label?: string;

  /**
   * Disable all inputs
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom style for the container
   */
  containerStyle?: ViewStyle;

  /**
   * Custom style for individual input
   */
  inputStyle?: ViewStyle;

  /**
   * Custom style for focused input
   */
  focusedInputStyle?: ViewStyle;

  /**
   * Custom style for input with error
   */
  errorInputStyle?: ViewStyle;
}

export interface OTPInputRef {
  /**
   * Clear all OTP inputs and focus first input
   */
  clearOTP: () => void;

  /**
   * Focus specific input by index
   */
  focusInput: (index: number) => void;

  /**
   * Get current OTP value
   */
  getValue: () => string;
}
