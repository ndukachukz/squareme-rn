import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import ScreenHeader from "../screen-header";
import { ScreenHeaderWithBackProps } from "./screen-header-with-back.types";
import ArrowLeft from "@assets/svgs/arrow-left.svg";

const ScreenHeaderWithBack: React.FC<ScreenHeaderWithBackProps> = ({
  onBack,
  customBackButton,
  ...screenHeaderProps
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const backButton = (
    <TouchableRipple onPress={handleBack}>
      {customBackButton || <ArrowLeft width={24} height={24} />}
    </TouchableRipple>
  );

  return <ScreenHeader {...screenHeaderProps} headerLeft={backButton} />;
};

export default ScreenHeaderWithBack;
