import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SuccessScreen from "@/components/screens/success-screen";
import { useNavigation } from "@react-navigation/native";

const SetupPinSuccess = () => {
  const navigation = useNavigation();
  return (
    <SuccessScreen
      title="PIN Created Successfully!"
      buttonText="Continue"
      description="You have successfully created your security pin."
      buttonProps={{
        onPress: () => {
          // Navigate to the main app after PIN setup is complete
          navigation.navigate("AuthStack", {
            screen: "SetupBVN",
          });
        },
      }}
    />
  );
};

export default SetupPinSuccess;

const styles = StyleSheet.create({});
