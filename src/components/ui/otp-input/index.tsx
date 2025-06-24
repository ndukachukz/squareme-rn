import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import styles from "./otp-input.styles";
import { OTPInputProps } from "./otp-input.types";

const OTPInput: React.FC<OTPInputProps> = ({
  length = 5,
  value = "",
  onChange,
  onComplete,
  autoFocus = true,
  editable = true,
  secureTextEntry = false,
  keyboardType = "numeric",
  placeholder = "",
  error,
  label,
  disabled = false,
  containerStyle,
  inputStyle,
  focusedInputStyle,
  errorInputStyle,
  ...textInputProps
}) => {
  const { colors } = useTheme();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const inputRefs = useRef<(TextInput | null)[]>(new Array(length).fill(null));

  // Initialize OTP from value prop
  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, length);
      const paddedArray = [
        ...otpArray,
        ...new Array(length - otpArray.length).fill(""),
      ];
      setOtp(paddedArray);
    } else {
      setOtp(new Array(length).fill(""));
    }
  }, [value, length]);

  // Auto-focus first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && editable && !disabled) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus, editable, disabled]);

  const handleTextChange = useCallback(
    (text: string, index: number) => {
      // Handle paste scenario - if text is longer than 1 char
      if (text.length > 1) {
        const pastedText = text.slice(0, length);
        const newOtp = [...otp];

        for (let i = 0; i < pastedText.length && index + i < length; i++) {
          newOtp[index + i] = pastedText[i];
        }

        setOtp(newOtp);
        onChange?.(newOtp.join(""));

        // Focus next empty input or last input if all filled
        const nextEmptyIndex = newOtp.findIndex((char) => char === "");
        const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;

        if (inputRefs.current[targetIndex]) {
          setTimeout(() => {
            inputRefs.current[targetIndex]?.focus();
          }, 10);
        }

        // Check if OTP is complete
        if (newOtp.every((char) => char !== "")) {
          onComplete?.(newOtp.join(""));
          Keyboard.dismiss();
        }

        return;
      }

      // Single character input
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      onChange?.(newOtp.join(""));

      // Auto-focus next input
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if OTP is complete
      if (newOtp.every((char) => char !== "") && text) {
        onComplete?.(newOtp.join(""));
        Keyboard.dismiss();
      }
    },
    [otp, length, onChange, onComplete]
  );

  const handleKeyPress = useCallback(
    (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>,
      index: number
    ) => {
      const { key } = event.nativeEvent;

      if (key === "Backspace" && !otp[index] && index > 0) {
        // Move focus to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
      }
    },
    [otp, onChange]
  );

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  const handleInputPress = useCallback((index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  }, []);

  const getInputStyle = useCallback(
    (index: number) => {
      const baseStyle = [
        styles.input,
        {
          borderColor: "#E5E7EB",
          backgroundColor: colors.inputFieldBackground,
          color: colors.gray500,
        },
        inputStyle,
      ];

      if (focusedIndex === index) {
        baseStyle.push(
          styles.focusedInput,
          { borderColor: colors.primary500 },
          focusedInputStyle
        );
      }

      if (error) {
        baseStyle.push(
          styles.errorInput,
          { borderColor: "#FF6B6B" },
          errorInputStyle
        );
      }

      if (disabled) {
        baseStyle.push(styles.disabledInput, { opacity: 0.6 });
      }

      return baseStyle;
    },
    [
      focusedIndex,
      error,
      disabled,
      colors,
      inputStyle,
      focusedInputStyle,
      errorInputStyle,
    ]
  );

  const clearOTP = useCallback(() => {
    const newOtp = new Array(length).fill("");
    setOtp(newOtp);
    onChange?.("");
    inputRefs.current[0]?.focus();
  }, [length, onChange]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.gray500 }]} fontSize={15}>
          {label}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <Pressable
            key={index}
            onPress={() => handleInputPress(index)}
            style={getInputStyle(index)}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.hiddenInput}
              value={secureTextEntry ? (digit ? "•" : "") : digit}
              onChangeText={(text) => handleTextChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              maxLength={Platform.OS === "ios" ? 1 : length} // iOS: 1 char, Android: allow paste
              keyboardType={keyboardType}
              editable={editable && !disabled}
              selectTextOnFocus
              placeholder={placeholder}
              placeholderTextColor={colors.inputPlaceholder}
              autoComplete="one-time-code"
              textContentType="oneTimeCode"
              {...textInputProps}
            />
            {!secureTextEntry && (
              <Text
                style={[
                  styles.digitText,
                  { color: digit ? colors.gray500 : colors.inputPlaceholder },
                ]}
                fontSize={18}
                fontWeight="500"
              >
                {digit || placeholder}
              </Text>
            )}
            {secureTextEntry && (
              <View style={styles.secureTextContainer}>
                {digit && (
                  <View
                    style={[
                      styles.secureTextDot,
                      { backgroundColor: colors.gray500 },
                    ]}
                  />
                )}
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {error && (
        <Text style={styles.error} fontSize={14}>
          {error}
        </Text>
      )}
    </View>
  );
};

// Expose clearOTP method for external access
export const createOTPInputRef = () => {
  return useRef<{ clearOTP: () => void }>(null);
};

export default OTPInput;
