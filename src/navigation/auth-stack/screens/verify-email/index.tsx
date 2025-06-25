import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import OTPInput from "@/components/ui/otp-input";
import Button from "@/components/ui/button";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import KeyboardAwareView from "@/components/ui/keyboard-aware-view";
import { TouchableRipple } from "react-native-paper";
import { convertLineHeightToPixels } from "@/utils/metrics";
import styles from "./verify-email.styles";
import { VerifyEmailProps } from "./verify-email.types";

const VerifyEmail: React.FC<VerifyEmailProps> = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const handleOtpChange = useCallback((newOtp: string) => {
    setOtp(newOtp);
  }, []);

  const handleVerify = useCallback(() => {
    navigation.navigate("AuthStack", {
      screen: "EmailSuccess",
    });
  }, [navigation]);

  const handleOtpComplete = useCallback(
    (completedOtp: string) => {
      // Auto-submit when OTP is complete
      handleVerify();
    },
    [handleVerify]
  );

  const handleResendCode = useCallback(() => {
    // Reset countdown and disable resend button
    setCountdown(60);
    setIsResendDisabled(true);

    // Clear current OTP
    setOtp("");

    // TODO: Add actual resend code logic here
    console.log("Resending email verification code...");
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(1, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeaderWithBack title="Verify your email address" />

      <KeyboardAwareView contentContainerStyle={styles.content}>
        <View style={styles.formSection}>
          <Text
            fontSize={15}
            style={[
              styles.description,
              { lineHeight: convertLineHeightToPixels(145, 15) },
            ]}
          >
            Please input the five (5) digit code that was sent to your email
            address below
          </Text>

          <View style={styles.otpContainer}>
            <OTPInput
              length={5}
              value={otp}
              onChange={handleOtpChange}
              onComplete={handleOtpComplete}
              keyboardType="numeric"
              autoFocus={true}
            />
          </View>

          <View style={styles.resendContainer}>
            <Text
              fontSize={15}
              fontWeight="500"
              style={[styles.timer, { color: colors.magenta }]}
            >
              {formatTime(countdown)}
            </Text>
            <TouchableRipple
              onPress={handleResendCode}
              disabled={isResendDisabled}
              style={[
                styles.resendButton,
                { opacity: isResendDisabled ? 0.5 : 1 },
              ]}
            >
              <Text
                fontSize={15}
                fontWeight="500"
                style={[
                  styles.resendText,
                  {
                    color: colors.magenta,
                    opacity: isResendDisabled ? 0.5 : 1,
                  },
                ]}
              >
                Resend code
              </Text>
            </TouchableRipple>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleVerify}
            disabled={otp.length !== 5}
          />
        </View>
      </KeyboardAwareView>
    </SafeAreaView>
  );
};

export default VerifyEmail;
