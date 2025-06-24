import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import ScreenHeader from "@/components/sections/screen-header";
import Text from "@/components/ui/text";
import OTPInput from "@/components/ui/otp-input";
import { Icon, TouchableRipple } from "react-native-paper";
import arrow_left from "@assets/svgs/arrow-left.svg";
import { convertLineHeightToPixels } from "@/utils/metrics";
import styles from "./setup-pin.styles";
import { SetupPinProps } from "./setup-pin.types";

const SetupPin: React.FC<SetupPinProps> = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [pin, setPin] = useState("");

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handlePinComplete = (completedPin: string) => {
    console.log("PIN completed:", completedPin);
    // Handle PIN completion here - navigate to next screen or save PIN
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        <ScreenHeader
          headerLeft={
            <TouchableRipple onPress={() => navigation.goBack()}>
              <Icon source={arrow_left} size={24} />
            </TouchableRipple>
          }
          title="Set your Security PIN"
        />

        <View style={styles.content}>
          <Text
            fontSize={15}
            fontWeight="400"
            style={[
              styles.description,
              {
                color: colors.gray500,
                lineHeight: convertLineHeightToPixels(145, 17),
              },
            ]}
          >
            Set a six (6) digit pin that you would use for all transactions
          </Text>

          <View style={styles.otpContainer}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetupPin;
