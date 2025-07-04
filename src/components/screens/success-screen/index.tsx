import React from "react";
import InfoScreen from "../info-screen";
import success_check from "@assets/imgs/success-check.png";
import { SuccessScreenProps } from "./success-screen.types";
import styles from "./success-screen.styles";
import transaction_success from "@assets/imgs/transaction-success.png";

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  infoImage,
  transaction,
  ...props
}) => {
  return (
    <InfoScreen
      infoImage={{
        source: transaction ? transaction_success : success_check,
        style: transaction
          ? styles.transaction_image_style
          : styles.image_style,
        ...infoImage,
      }}
      {...props}
    />
  );
};

export default SuccessScreen;
