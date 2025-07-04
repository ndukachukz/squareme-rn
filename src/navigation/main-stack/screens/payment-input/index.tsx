import { Pressable, View } from "react-native";
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
import { ArrowDown2, Clock } from "iconsax-react-nativejs";
import PaymentOptionsBottomSheet from "./components/payment-options-bottom-sheet";
import Button from "@/components/ui/button";
import NumericKeyboard from "@/components/ui/numeric-keyboard";
import styles from "./payment-input.styles";
import { useNavigation } from "@react-navigation/native";
import { PaymentAction, TransactionType } from "@/types/transactions.types";
import { usePaymentStore } from "@/store/payment-store";

const PaymentInput: React.FC<PaymentInputProps> = ({ route }) => {
  const paymentAction = route.params.paymentAction;

  const {
    setSelectedTransactionType,
    selectedTransactionType,
    ...paymentStore
  } = usePaymentStore();

  const navigation = useNavigation();
  const { colors } = useTheme();
  const [paymentOptionsVisible, setPaymentOptionVisible] =
    useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");

  const presentOptions = () => setPaymentOptionVisible(true);

  const getPaymentOptionLabel = useCallback(
    (option: TransactionType, paymentAction: PaymentAction) => {
      if (paymentAction === "send") {
        switch (option) {
          case "bank_account":
            return "Send to bank account";
          case "beneficiary":
            return "Send to a beneficiary";
          case "tag":
            return "Send using Squareme tag";
          case "contact":
            return "Send to contact list";
          default:
            return "";
        }
      } else {
        switch (option) {
          case "beneficiary":
            return "Request from a beneficiary";
          case "contact":
            return "Request from contact list";
          case "tag":
            return "Request using Squareme tag";
          default:
            return "";
        }
      }
    },
    []
  );

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

  const handleFormatAmount = useCallback((value: string) => {
    if (!value) return "0";

    // If the value is just "0." keep it as is
    if (value === "0.") return "0.";

    // If the value ends with a decimal point, keep it
    if (value.endsWith(".") && value.length > 1) {
      const beforeDecimal = value.slice(0, -1);
      const cleanedBeforeDecimal = beforeDecimal.replace(/^0+(?=\d)/, "");
      const formattedBeforeDecimal = (cleanedBeforeDecimal || "0").replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      return formattedBeforeDecimal + ".";
    }

    // Remove leading zeros except when followed by decimal point
    const cleaned = value.replace(/^0+(?=\d)/, "");
    const finalValue = cleaned || "0";

    // Split into integer and decimal parts
    const parts = finalValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Add thousands separators to integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Return with decimal part if it exists
    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  }, []);

  const getNumericAmount = useCallback(() => {
    return parseFloat(amount) || 0;
  }, [amount]);

  const handleHistoryPress = useCallback(() => {
    navigation.navigate("MainStack", {
      screen: "Transactions",
    });
  }, []);

  const handleProceed = useCallback(() => {
    paymentStore.setAmount(parseFloat(amount));
    paymentStore.setPaymentAction(paymentAction);

    navigation.navigate("MainStack", {
      screen:
        selectedTransactionType === "tag"
          ? "TagTransaction"
          : selectedTransactionType === "contact"
          ? "ContactTransaction"
          : selectedTransactionType === "beneficiary"
          ? "SelectBeneficiary"
          : "BankAccountTransaction",
      params: {
        paymentAction,
        amount: parseFloat(amount),
      },
    });
  }, [amount, selectedTransactionType, paymentAction]);

  return (
    <React.Fragment>
      <ScreenWrapper
        statusBarProps={{
          backgroundColor: "#0C0C26",
        }}
        contentContainerStyle={styles.container}
      >
        <View style={{ rowGap: verticalScale(24) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: horizontalScale(15),
            }}
          >
            <View style={{ width: 32 }} />
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
            <Pressable onPress={handleHistoryPress}>
              <Clock size={moderateScale(24)} color={colors.white} />
            </Pressable>
          </View>

          <Pressable onPress={presentOptions} style={styles.select_trigger}>
            <Text color={colors.white}>
              {!selectedTransactionType
                ? paymentAction === "request"
                  ? "Who do you want to request from?"
                  : "Where do you want to send money?"
                : getPaymentOptionLabel(selectedTransactionType, paymentAction)}
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
            {handleFormatAmount(amount)}
          </Text>
        </View>

        <NumericKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete} />

        <Button
          title="Proceed"
          disabled={getNumericAmount() === 0}
          onPress={handleProceed}
          style={{ marginTop: verticalScale(24) }}
        />
      </ScreenWrapper>

      <PaymentOptionsBottomSheet
        isVisible={paymentOptionsVisible}
        paymentAction={route.params.paymentAction}
        onClose={() => setPaymentOptionVisible(false)}
        onSelect={setSelectedTransactionType}
      />
    </React.Fragment>
  );
};

export default PaymentInput;
