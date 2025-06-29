import React from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import { MenuListItemProps } from "./menu-list-item.types";
import { styles } from "./menu-list-item.styles";

const MenuListItem: React.FC<MenuListItemProps> = ({
  icon,
  title,
  description,
  onPress,
  iconContainerBgColor: iconContainerColor,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              iconContainerColor ?? styles.iconContainer.backgroundColor,
          },
        ]}
      >
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text
          fontWeight="500"
          fontSize={15}
          lineHeight={22.5}
          style={styles.itemTitle}
        >
          {title}
        </Text>
        <Text
          fontSize={14}
          lineHeight={21}
          color={colors.secondaryText}
          style={styles.itemDescription}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuListItem;
