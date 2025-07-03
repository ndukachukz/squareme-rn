import React, { useCallback } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ArrowLeft2 } from "iconsax-react-nativejs";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import { horizontalScale, verticalScale, moderateScale } from "@/utils/metrics";
import { NumericKeyboardProps } from "./numeric-keyboard.types";

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({
  onKeyPress,
  onDelete,
  style,
}) => {
  const { colors } = useTheme();

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "delete"],
  ];

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "delete") {
        onDelete?.();
      } else {
        onKeyPress?.(key);
      }
    },
    [onDelete, onKeyPress]
  );

  const renderKey = useCallback(
    (key: string) => {
      const isDelete = key === "delete";

      return (
        <Pressable
          key={key}
          style={[styles.key]}
          onPress={() => handleKeyPress(key)}
          android_ripple={{ color: colors.gray100, borderless: false }}
        >
          {isDelete ? (
            <ArrowLeft2 size={moderateScale(24)} color={colors.white} />
          ) : (
            <Text
              fontSize={24}
              fontWeight="400"
              color={"#BDBDBD"}
              style={styles.keyText}
            >
              {key}
            </Text>
          )}
        </Pressable>
      );
    },
    [handleKeyPress, colors]
  );

  return (
    <View style={[styles.container, style]}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => renderKey(key))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: verticalScale(25.26),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: horizontalScale(24),
  },
  key: {
    width: horizontalScale(88),
    height: verticalScale(66),
    // paddingHorizontal: moderateScale(40),
    // paddingVertical: moderateScale(16),
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    textAlign: "center",
  },
});

export default NumericKeyboard;
