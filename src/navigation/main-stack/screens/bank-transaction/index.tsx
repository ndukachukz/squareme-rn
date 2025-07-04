import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransactionScreenParams } from "@/types/transactions.types";
import ScreenWrapper from "@/components/ui/screen-wrapper";

const BankAccountTransaction: React.FC<TransactionScreenParams> = ({
  route,
}) => {
  const { paymentAction, amount } = route.params;

  return (
    <ScreenWrapper>
      <Text>BankAccountTransaction</Text>
    </ScreenWrapper>
  );
};

export default BankAccountTransaction;

const styles = StyleSheet.create({});
