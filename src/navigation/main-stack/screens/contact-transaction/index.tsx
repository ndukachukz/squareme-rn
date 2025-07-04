import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransactionScreenParams } from "@/types/transactions.types";
import ScreenWrapper from "@/components/ui/screen-wrapper";

const ContactTransaction: React.FC<TransactionScreenParams> = ({ route }) => {
  const { paymentAction, amount } = route.params;

  return (
    <ScreenWrapper>
      <Text>ContactTransaction</Text>
    </ScreenWrapper>
  );
};

export default ContactTransaction;

const styles = StyleSheet.create({});
