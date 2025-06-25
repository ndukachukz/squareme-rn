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
import styles from "./confirm-pin.styles";
import { ConfirmPinProps } from "./confirm-pin.types";

const ConfirmPin: React.FC<ConfirmPinProps> = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [pin, setPin] = useState("");

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handlePinComplete = (completedPin: string) => {
    navigation.navigate("AuthStack", {
      screen: "SetupBVN",
    });
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
          title="Confirm your Security PIN"
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
            Input your six (6) digit PIN again
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

export default ConfirmPin;
