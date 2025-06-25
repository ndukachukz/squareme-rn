import { View } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import Text from "@/components/ui/text";
import {
  convertLineHeightToPixels,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: verticalScale(23),
              paddingTop: verticalScale(10),
              rowGap: verticalScale(5),
            }}
          >
            {options.tabBarIcon
              ? options.tabBarIcon({
                  color: isFocused ? colors.primary500 : colors.gray400,
                  focused: isFocused,
                  size: moderateScale(24),
                })
              : null}

            {typeof label === "function" ? (
              label({
                focused: isFocused,
                color: isFocused ? colors.primary500 : colors.gray400,
                position: "below-icon" as const,
                children: route.name,
              })
            ) : (
              <Text
                fontSize={13}
                lineHeight={convertLineHeightToPixels(150, 13)}
                fontWeight={isFocused ? "500" : "400"}
                style={{
                  color: isFocused ? colors.primary500 : colors.gray400,
                }}
              >
                {label}
              </Text>
            )}
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default TabBar;
