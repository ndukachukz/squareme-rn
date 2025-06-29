import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { BackHandler } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { AppBottomSheetProps } from "./app-bottom-sheet.types";
import styles from "./app-bottom-sheet.styles";

const AppBottomSheet = forwardRef<BottomSheet, AppBottomSheetProps>(
  (props, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const isExpanded = useRef(false);

    // Expose the bottom sheet ref methods to parent components
    useImperativeHandle(ref, () => ({
      snapToIndex: (index: number) =>
        bottomSheetRef.current?.snapToIndex(index),
      snapToPosition: (position: string | number) =>
        bottomSheetRef.current?.snapToPosition(position),
      expand: () => bottomSheetRef.current?.expand(),
      collapse: () => bottomSheetRef.current?.collapse(),
      close: () => bottomSheetRef.current?.close(),
      forceClose: () => bottomSheetRef.current?.forceClose(),
    }));

    // Handle back press
    useEffect(() => {
      const backAction = () => {
        if (isExpanded.current) {
          bottomSheetRef.current?.close();
          return true; // Prevent default back action
        }
        return false; // Allow default back action
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, []);

    // Track bottom sheet state changes
    const handleSheetChanges = useCallback(
      (index: number, position: number, type: any) => {
        isExpanded.current = index > -1;
        // Call the original onChange if provided with all arguments
        if (props.onChange) {
          props.onChange(index, position, type);
        }
      },
      [props.onChange, isExpanded.current]
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        {...props}
        onChange={handleSheetChanges}
      />
    );
  }
);

AppBottomSheet.displayName = "AppBottomSheet";

export default memo(AppBottomSheet);
