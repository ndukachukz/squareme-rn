import { StyleSheet, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { ConfirmTransactionProps } from "./confirm-transaction.types";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import {
  convertLineHeightToPixels,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import { horizontalScale } from "@/utils/metrics";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import Separator from "@/components/ui/separator";
import Button from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ route }) => {
  const { transactionType, amount, paymentAction } = route.params;
  const navigation = useNavigation();

  const { colors } = useTheme();

  const title = useMemo(() => {
    if (paymentAction === "send") {
      return "Confirm Transaction";
    } else if (paymentAction === "request") {
      return "Confirm Request";
    }
  }, [paymentAction]);

  const handleConfirm = useCallback(() => {
    navigation.navigate("MainStack", {
      screen: "AuthorizeTransaction",
      params: {
        transactionType,
        amount,
        paymentAction,
      },
    });
  }, [paymentAction, transactionType, amount]);

  const details = useMemo(() => {
    if (paymentAction === "send") {
      return [
        {
          label: "Beneficiary Number",
          value: "0800000000",
        },
        {
          label: "Beneficiary",
          value: "Mubarak Olaoye",
        },
      ];
    }

    if (paymentAction === "request") {
      return [
        {
          label: "Recipient Tag",
          value: "@davidOlaoye",
        },
        {
          label: "Recipient",
          value: "David Olaoye",
        },
      ];
    }
    return [
      {
        label: "Recipient Tag",
        value: "@davidOlaoye",
      },
      {
        label: "Recipient",
        value: "David Olaoye",
      },
    ];
  }, [paymentAction, transactionType]);

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <View>
        <ScreenHeaderWithBack title={title} />

        <View style={styles.content_container}>
          <Text fontSize={15}>
            Please confirm the details of your transaction
          </Text>

          <View style={{ rowGap: verticalScale(34) }}>
            <View
              style={[
                styles.amount_container,
                { backgroundColor: colors.primary500 },
              ]}
            >
              <Text
                fontWeight="500"
                fontSize={15}
                lineHeight={convertLineHeightToPixels(150, 15)}
                color={colors.white}
              >
                Amount
              </Text>
              <Text
                fontWeight="500"
                fontSize={24}
                lineHeight={convertLineHeightToPixels(140, 24)}
                color={colors.white}
              >
                NGN {amount}
              </Text>
            </View>

            <View style={styles.details_container}>
              {details.map((detail, i) => (
                <React.Fragment key={i}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: verticalScale(16),
                    }}
                  >
                    <Text fontSize={15} color={colors.gray300}>
                      {detail.label}:
                    </Text>
                    <Text fontSize={15}>{detail.value}</Text>
                  </View>

                  {i !== details.length - 1 && (
                    <Separator backgroundColor="#EFEFF1" />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: verticalScale(24),
        }}
      >
        <Button
          title="Cancel"
          variant="outline"
          onPress={navigation.goBack}
          style={{ flex: 1 }}
        />

        <Button
          title="Confirm"
          onPress={handleConfirm}
          style={{ flex: 1.5, marginLeft: horizontalScale(16) }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ConfirmTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(18),
    paddingTop: verticalScale(13),
  },

  content_container: {
    paddingTop: verticalScale(40),
    rowGap: verticalScale(24),
  },
  amount_container: {
    alignItems: "center",
    paddingVertical: verticalScale(20),
    borderRadius: 8,
  },

  details_container: {
    backgroundColor: "#F9F9F9",
    borderColor: "#EFEFF1",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(20),
  },
});
