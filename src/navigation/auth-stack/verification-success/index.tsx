import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SuccessScreen from "@/components/screens/success-screen";
import { useNavigation } from "@react-navigation/native";

const VerificationSuccess = () => {
  const navigation = useNavigation();
  return (
    <SuccessScreen
      title="Verification Successful!"
      buttonText="Continue"
      description="Your phone number has been verified successfully."
      buttonProps={{
        onPress: () =>
          navigation.navigate("AuthStack", {
            screen: "SetupPin",
          }),
      }}
    />
  );
};

export default VerificationSuccess;

const styles = StyleSheet.create({});
