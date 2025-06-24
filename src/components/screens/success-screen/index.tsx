import React from "react";
import InfoScreen from "../info-screen";
import success_check from "@assets/imgs/success-check.png";
import { SuccessScreenProps } from "./success-screen.types";
import styles from "./success-screen.styles";

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  infoImage,
  ...props
}) => {
  return (
    <InfoScreen
      infoImage={{
        source: success_check,
        style: styles.image_style,
        ...infoImage,
      }}
      {...props}
    />
  );
};

export default SuccessScreen;
