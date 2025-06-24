import { View, Image } from "react-native";
import React from "react";
import { InfoScreenProps } from "./info-screen.types";
import styles from "./info-screen.styles";
import Button from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import { convertLineHeightToPixels } from "@/utils/metrics";

const InfoScreen: React.FC<InfoScreenProps> = ({
  buttonText = "Continue",
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.content_container}>
        {props.infoImage && <Image resizeMode="contain" {...props.infoImage} />}

        <Text
          style={[styles.title, { color: colors.gray500 }]}
          fontSize={20}
          lineHeight={convertLineHeightToPixels(140, 20)}
          fontWeight="600"
          {...props.titleProps}
        >
          {props.title}
        </Text>
        <Text
          fontSize={15}
          lineHeight={convertLineHeightToPixels(145, 15)}
          {...props.descriptionProps}
        >
          {props.description}
        </Text>
      </View>

      <Button {...props.buttonProps} title={buttonText} />
    </View>
  );
};

export default InfoScreen;
