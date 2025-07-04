import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransactionScreenParams } from "@/types/transactions.types";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";

const SelectBeneficiary: React.FC<TransactionScreenParams> = ({ route }) => {
  const { paymentAction, amount } = route.params;

  return (
    <ScreenWrapper>
      <ScreenHeaderWithBack title="" />
    </ScreenWrapper>
  );
};

export default SelectBeneficiary;

const styles = StyleSheet.create({});
