import React from "react";
import { useNavigation } from "@react-navigation/native";
import InfoScreen from "@/components/screens/info-screen";
import envelope from "@assets/imgs/envelope.png";
import styles from "./stay-in-loop.styles";

const StayInLoop: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("AuthStack", {
      screen: "EnterEmail",
    });
  };

  const handleCancel = () => {
    // Handle newsletter opt-out
    console.log("User opted out of newsletter");
    // Navigate to next screen (you can customize this based on your flow)
    // navigation.navigate('NextScreen');
  };

  return (
    <InfoScreen
      infoImage={{
        source: envelope,
        style: styles.envelopeImage,
      }}
      title="Stay in the Loop!"
      titleProps={{
        style: styles.title,
      }}
      description={
        "Get ready to be the first to know about all the cool stuff happening at Squareme! From new features and product updates to exclusive offers and insider tips, we'll make sure you're always ahead of the curve. \nExcited to stay connected? Just hit the button below and let us keep you in the know!"
      }
      descriptionProps={{
        style: styles.description,
      }}
      buttons={[
        {
          title: "Yes, please",
          onPress: handleContinue,
          variant: "primary",
        },
        {
          title: "No, thank you",
          onPress: handleCancel,
          variant: "ghost",
        },
      ]}
    />
  );
};

export default StayInLoop;
