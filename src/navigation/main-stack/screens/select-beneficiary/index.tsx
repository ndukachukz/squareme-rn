import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { TransactionScreenParams } from "@/types/transactions.types";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";

const SelectBeneficiary: React.FC<TransactionScreenParams> = ({ route }) => {
  const { paymentAction, amount } = route.params;

  const screenTitle = useMemo(() => {
    if (paymentAction === "request") return "Request from Beneficiary";
    if (paymentAction === "send") return "Send";
  }, [paymentAction]);

  return (
    <ScreenWrapper>
      <ScreenHeaderWithBack title={screenTitle} />
    </ScreenWrapper>
  );
};

export default SelectBeneficiary;

const styles = StyleSheet.create({});
