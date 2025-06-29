import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import { PaymentInputProps } from "./payment-input.types";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import { ArrowDown2 } from "iconsax-react-nativejs";
import PaymentOptionsBottomSheet from "./components/payment-options-bottom-sheet";

const PaymentInput: React.FC<PaymentInputProps> = ({ route }) => {
  const { colors } = useTheme();
  const [paymentOptionsVisible, setPaymentOptionVisible] =
    useState<boolean>(false);

  const presentOptions = () => setPaymentOptionVisible(true);

  return (
    <React.Fragment>
      <ScreenWrapper
        statusBarProps={{
          backgroundColor: "#0C0C26",
        }}
        contentContainerStyle={styles.container}
      >
        <View style={styles.wallet_info}>
          <Text
            fontSize={15}
            lineHeight={convertLineHeightToPixels(150, 15)}
            color={colors.gray100}
          >
            Wallet Balance
          </Text>
          <Text
            color={colors.white}
            fontSize={20}
            lineHeight={convertLineHeightToPixels(140, 20)}
          >
            ₦5,200
          </Text>
        </View>
        <Pressable onPress={presentOptions} style={styles.select_trigger}>
          <Text color={colors.white}>
            {route.params.type === "request"
              ? "Who do you want to request from?"
              : "Where do you want to send money?"}
          </Text>
          <ArrowDown2 size={moderateScale(20)} color={colors.gray100} />
        </Pressable>
      </ScreenWrapper>

      <PaymentOptionsBottomSheet
        isVisible={paymentOptionsVisible}
        type={route.params.type}
        onClose={() => setPaymentOptionVisible(false)}
      />
    </React.Fragment>
  );
};

export default PaymentInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0C26",
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(32),
    paddingHorizontal: horizontalScale(18),
    rowGap: verticalScale(24),
  },
  wallet_info: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    alignSelf: "center",
    alignItems: "center",
    rowGap: verticalScale(4),
    borderRadius: 12,
    backgroundColor: "#9F56D41A",
  },
  select_trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: "#38225A",
    alignItems: "center",
    borderRadius: 6,
  },
});
