import { Pressable, View } from "react-native";
import React from "react";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import { convertLineHeightToPixels } from "@/utils/metrics";
import { styles } from "./section-header.styles";
import { SectionHeaderProps } from "./section-header.types";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  titleColor,
  actionText,
  onActionPress,
  titleFontSize = 15,
  actionFontSize = 12,
  containerStyle,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        fontWeight="500"
        fontSize={titleFontSize}
        color={titleColor}
        lineHeight={convertLineHeightToPixels(100, titleFontSize)}
      >
        {title}
      </Text>

      {actionText && onActionPress && (
        <Pressable onPress={onActionPress}>
          <Text
            fontWeight="500"
            fontSize={actionFontSize}
            lineHeight={convertLineHeightToPixels(150, actionFontSize)}
            color={colors.tertiary500}
          >
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SectionHeader;
