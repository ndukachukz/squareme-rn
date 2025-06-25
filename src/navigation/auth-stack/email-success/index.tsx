import React from "react";
import { useNavigation } from "@react-navigation/native";
import SuccessScreen from "@/components/screens/success-screen";

const EmailSuccess: React.FC = () => {
  const navigation = useNavigation();

  const handleGoToDashboard = () => {
    navigation.navigate("MainStack", {
      screen: "HomeTabs",
    });
  };

  return (
    <SuccessScreen
      title="Email added successfully!"
      buttonText="Go to Dashboard"
      description="Your email address has been added successfully."
      buttonProps={{
        onPress: handleGoToDashboard,
      }}
    />
  );
};

export default EmailSuccess;
