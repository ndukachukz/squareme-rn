import { View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import Button from "@/components/ui/button";
import OTPInput from "@/components/ui/otp-input";
import { verticalScale, horizontalScale } from "@/utils/metrics";
import logo from "@/assets/imgs/logo.png";
import HelpCircle from "@/assets/svgs/help-circel.svg";
import FingerprintIcon from "@/assets/svgs/fingerprint.svg";
import { Icon } from "react-native-paper";

const Login = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [pin, setPin] = useState("");

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handlePinComplete = (completedPin: string) => {
    // Handle login logic here
    console.log("PIN entered:", completedPin);
  };

  const handleBiometricLogin = () => {
    // Handle biometric authentication
    console.log("Biometric login requested");
  };

  const handleForgotPin = () => {
    // Handle forgot PIN logic
    console.log("Forgot PIN requested");
  };

  const handleLogin = () => {
    // Handle login button press
    console.log("Login button pressed");
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout requested");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: horizontalScale(18),
          paddingTop: verticalScale(19),
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: verticalScale(80),
          }}
        >
          <Image
            source={logo}
            style={{
              width: horizontalScale(141),
              height: verticalScale(23),
            }}
            resizeMode="contain"
          />
          <HelpCircle width={horizontalScale(24)} height={verticalScale(24)} />
        </View>

        {/* Main Content */}
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            {/* Welcome Section */}
            <View style={{ marginBottom: verticalScale(60) }}>
              <Text
                fontSize={24}
                fontWeight="600"
                style={{
                  marginBottom: verticalScale(12),
                  color: colors.gray500,
                }}
              >
                Welcome back John
              </Text>
              <Text
                fontSize={15}
                style={{
                  color: colors.gray500,
                  opacity: 0.7,
                }}
              >
                Enter your PIN to access your Squareme account
              </Text>
            </View>

            {/* PIN Input */}
            <View style={{ marginBottom: verticalScale(24) }}>
              <OTPInput
                length={6}
                value={pin}
                onChange={handlePinChange}
                onComplete={handlePinComplete}
                keyboardType="numeric"
                secureTextEntry={true}
                autoFocus={true}
              />
            </View>

            {/* Forgot PIN */}
            <View
              style={{ alignItems: "center", marginBottom: verticalScale(60) }}
            >
              <Pressable onPress={handleForgotPin}>
                <Text
                  fontSize={15}
                  style={{
                    color: colors.tertiary500,
                  }}
                >
                  Forgot PIN?
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={{ rowGap: verticalScale(30) }}>
            {/* Biometric Section */}
            <Pressable
              onPress={handleBiometricLogin}
              style={{
                alignItems: "center",
                gap: verticalScale(12),
              }}
            >
              <View
                style={{
                  backgroundColor: colors.inputContainer,
                  padding: verticalScale(12),
                  borderRadius: 100,
                }}
              >
                <Icon source={FingerprintIcon} size={48} />
              </View>

              <Text
                fontSize={15}
                style={{
                  color: colors.gray500,
                }}
              >
                Use Biometrics
              </Text>
            </Pressable>

            <View style={{ rowGap: verticalScale(12) }}>
              {/* Login Button */}
              <Button title="Log In" onPress={handleLogin} />

              <Text
                fontSize={15}
                style={{ color: colors.gray500, textAlign: "center" }}
              >
                Not John?{" "}
                <Text
                  fontSize={15}
                  style={{ color: colors.tertiary500 }}
                  onPress={handleLogout}
                >
                  Log out
                </Text>
              </Text>

              {/* Version */}

              <Text
                fontSize={15}
                style={{
                  textAlign: "center",
                }}
              >
                v2.5.501
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
