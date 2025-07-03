import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
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
import Button from "@/components/ui/button";
import NumericKeyboard from "@/components/ui/numeric-keyboard";

const PaymentInput: React.FC<PaymentInputProps> = ({ route }) => {
  const { colors } = useTheme();
  const [paymentOptionsVisible, setPaymentOptionVisible] =
    useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");

  const presentOptions = () => setPaymentOptionVisible(true);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === ".") {
        // Only allow one decimal point
        if (amount.includes(".")) return;
        // Don't allow decimal point as first character
        if (amount === "") {
          setAmount("0.");
          return;
        }
      }

      // Limit decimal places to 2
      if (amount.includes(".")) {
        const decimalPart = amount.split(".")[1];
        if (decimalPart && decimalPart.length >= 2) return;
      }

      setAmount((prevAmount) => prevAmount + key);
    },
    [amount]
  );

  const handleDelete = useCallback(() => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  }, []);

  const formatAmount = useCallback((value: string) => {
    if (!value) return "0";

    // If the value is just "0." keep it as is
    if (value === "0.") return "0.";

    // If the value ends with a decimal point, keep it
    if (value.endsWith(".") && value.length > 1) {
      const beforeDecimal = value.slice(0, -1);
      const cleanedBeforeDecimal = beforeDecimal.replace(/^0+(?=\d)/, "");
      return (cleanedBeforeDecimal || "0") + ".";
    }

    // Remove leading zeros except when followed by decimal point
    const cleaned = value.replace(/^0+(?=\d)/, "");
    return cleaned || "0";
  }, []);

  const getNumericAmount = useCallback(() => {
    return parseFloat(amount) || 0;
  }, [amount]);

  return (
    <React.Fragment>
      <ScreenWrapper
        statusBarProps={{
          backgroundColor: "#0C0C26",
        }}
        contentContainerStyle={styles.container}
      >
        <View style={{ rowGap: verticalScale(24) }}>
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
        </View>

        {/* Amount Display */}
        <View style={styles.amount_container}>
          <Text fontSize={36} color={colors.white} style={styles.currency}>
            ₦
          </Text>
          <Text fontSize={68} color={colors.white} style={styles.amount}>
            {formatAmount(amount)}
          </Text>
        </View>

        <NumericKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete} />

        <Button
          title="Proceed"
          disabled={getNumericAmount() === 0}
          onPress={() => {}}
          style={{ marginTop: verticalScale(24) }}
        />
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
    justifyContent: "space-between",
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
  amount_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(20),
  },
  currency: {},
  amount: {},
});
