import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import AppBottomSheet from "../app-bottom-sheet";
import { SelectBottomSheetProps } from "./select-bottom-sheet.types";
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Text from "../text";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import { ArrowRight2 } from "iconsax-react-nativejs";
import Separator from "../separator";
import { useTheme } from "@/hooks/useTheme";
import styles from "./select-bottom-sheet.styles";
import { BlurView } from "expo-blur";

const SelectBottomSheet = React.forwardRef<BottomSheet, SelectBottomSheetProps>(
  ({ title = "Select", options, ...props }, ref) => {
    const { colors } = useTheme();

    const renderBackdrop = useCallback(() => {
      return (
        <Pressable
          style={[StyleSheet.absoluteFill]}
          onPress={() => {
            if (ref && typeof ref === "object" && "current" in ref) {
              ref.current?.close();
            }
          }}
        >
          <BlurView
            intensity={0.5}
            experimentalBlurMethod="dimezisBlurView"
            style={{ flex: 1 }}
          />
        </Pressable>
      );
    }, []);

    return (
      <AppBottomSheet
        ref={ref}
        style={{ paddingTop: verticalScale(10) }}
        backgroundStyle={styles.sheet_background}
        handleIndicatorStyle={styles.sheet_handle}
        backdropComponent={renderBackdrop}
        {...props}
      >
        <BottomSheetScrollView contentContainerStyle={styles.container}>
          {title && (
            <Text
              color={colors.primary500}
              fontSize={15}
              fontWeight="500"
              lineHeight={convertLineHeightToPixels(150, 15)}
            >
              {title}
            </Text>
          )}

          <View style={styles.options_container}>
            {options.map((option, i) => (
              <React.Fragment key={i}>
                <TouchableOpacity
                  onPress={option.onSelect}
                  style={styles.option}
                >
                  <View style={styles.option_content}>
                    {option.left && (
                      <View style={styles.left_container}>{option.left}</View>
                    )}

                    <Text
                      fontSize={15}
                      lineHeight={convertLineHeightToPixels(145, 15)}
                    >
                      {option.title}
                    </Text>
                  </View>
                  {option.right ?? (
                    <ArrowRight2 size={moderateScale(24)} color="#23262F" />
                  )}
                </TouchableOpacity>

                {i < options.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </View>
        </BottomSheetScrollView>
      </AppBottomSheet>
    );
  }
);

export default SelectBottomSheet;
