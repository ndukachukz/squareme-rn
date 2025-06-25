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
  buttons,
  ...props
}) => {
  const { colors } = useTheme();

  const renderButtons = () => {
    // If buttons array is provided, use it
    if (buttons && buttons.length > 0) {
      return (
        <View style={styles.buttons_container}>
          {buttons.map((button, index) => {
            const { title, ...buttonProps } = button;

            return <Button key={index} title={title} {...buttonProps} />;
          })}
        </View>
      );
    }

    // Fallback to legacy single button for backward compatibility
    return <Button {...props.buttonProps} title={buttonText} />;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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

      {renderButtons()}
    </View>
  );
};

export default InfoScreen;
