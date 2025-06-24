import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView, Image } from "react-native";
import { VerifyPhoneProps } from "./verify-phone.types";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import styles from "./verify-phone.styles";
import ScreenHeader from "@/components/sections/screen-header";
import { Icon, IconButton, TouchableRipple } from "react-native-paper";
import arrow_left from "@assets/svgs/arrow-left.svg";
import KeyboardAwareView from "@/components/ui/keyboard-aware-view";
import {
  convertLineHeightToPixels,
  horizontalScale,
  verticalScale,
} from "@/utils/metrics";
import Text from "@/components/ui/text";
import OTPInput from "@/components/ui/otp-input";
import Button from "@/components/ui/button";

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

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

  const handleResendCode = useCallback(() => {
    // Reset countdown and disable resend button
    setCountdown(30);
    setIsResendDisabled(true);

    // TODO: Add actual resend code logic here
    console.log("Resending code...");
  }, []);

  const handleVerify = useCallback(() => {
    navigation.navigate("AuthStack", {
      screen: "VerificationSuccess",
    });
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: horizontalScale(18),
        }}
      >
        <ScreenHeader
          headerLeft={
            <TouchableRipple onPress={() => navigation.goBack()}>
              <Icon source={arrow_left} size={24} />
            </TouchableRipple>
          }
          title="Verify your phone number"
        />

        <KeyboardAwareView
          contentContainerStyle={{
            rowGap: horizontalScale(39.72),
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: verticalScale(36),
            }}
          >
            <Image
              source={require("@assets/imgs/paper-airplane-send-with-dotted-lines-flat-style 1.png")}
              resizeMode="contain"
              style={{
                width: horizontalScale(199),
                height: verticalScale(132.6334991455078),
              }}
            />
            <View>
              <Text
                fontWeight="500"
                fontSize={17}
                style={{
                  lineHeight: convertLineHeightToPixels(150, 17),
                  textAlign: "center",
                }}
              >
                Check your WhatsApp
              </Text>
              <Text
                fontWeight="400"
                fontSize={15}
                lineHeight={convertLineHeightToPixels(145, 15)}
                style={{ textAlign: "center" }}
              >
                Please input the five (5) digit code that was sent to your
                Whatsapp below
              </Text>
            </View>
          </View>

          <View
            style={{
              rowGap: verticalScale(19),
            }}
          >
            <OTPInput />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                fontSize={15}
                fontWeight="500"
                style={{ color: colors.magenta }}
              >
                {formatTime(countdown)}
              </Text>
              <TouchableRipple
                onPress={handleResendCode}
                disabled={isResendDisabled}
                style={{
                  opacity: isResendDisabled ? 0.5 : 1,
                }}
              >
                <Text
                  fontSize={15}
                  fontWeight="500"
                  style={{
                    color: colors.magenta,
                    opacity: isResendDisabled ? 0.5 : 1,
                  }}
                >
                  Resend code
                </Text>
              </TouchableRipple>
            </View>
          </View>
        </KeyboardAwareView>

        <Button title="verify" onPress={handleVerify} />
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhone;
