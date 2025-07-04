import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import { AuthorizeTransactionProps } from "./authorize-transaction.types";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import OTPInput from "@/components/ui/otp-input";
import { convertLineHeightToPixels } from "@/utils/metrics";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import styles from "@/navigation/auth-stack/screens/setup-pin/setup-pin.styles";

const AuthorizeTransaction: React.FC<AuthorizeTransactionProps> = ({
  route,
}) => {
  const { transactionType, amount, paymentAction } = route.params;

  const navigation = useNavigation();
  const { colors } = useTheme();
  const [pin, setPin] = useState("");

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handlePinComplete = (completedPin: string) => {
    navigation.navigate("MainStack", {
      screen: "TransactionSuccess",
      params: {
        transactionType,
        amount,
        paymentAction,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeaderWithBack title="Enter your security PIN" />

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
            Enter your PIN to continue. Do not share your PIN with anyone,
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
    </ScreenWrapper>
  );
};

export default AuthorizeTransaction;
