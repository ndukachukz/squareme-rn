import React, { useMemo } from "react";

import { TransactionSuccessProps } from "./transaction-success.types";
import SuccessScreen from "@/components/screens/success-screen";
import { StackActions, useNavigation } from "@react-navigation/native";

const TransactionSuccess: React.FC<TransactionSuccessProps> = ({ route }) => {
  const { amount, paymentAction } = route.params;

  const navigation = useNavigation();

  const content = useMemo(() => {
    if (paymentAction === "request")
      return {
        title: "Money Request sent",
        description: `You money request of  NGN ${amount} to Aderinsola. \nThe recipient should get an alert shortly`,
      };

    return {
      title: "Transaction Successful!",
      description: `You have successfully sent  NGN ${amount} to Aderinsola. \nThe recipient should get an alert shortly`,
    };
  }, [paymentAction, amount]);

  return (
    <SuccessScreen
      transaction
      buttonText="Done"
      buttonProps={{
        onPress: () => {
          navigation.dispatch(
            StackActions.replace("MainStack", {
              screen: "HomeTabs",
              params: {
                screen: "Payments",
              },
            })
          );
        },
      }}
      descriptionProps={{
        style: {
          textAlign: "center",
        },
      }}
      titleProps={{
        style: {
          textAlign: "center",
        },
      }}
      description={content?.description}
      title={content?.title}
    />
  );
};

export default TransactionSuccess;
