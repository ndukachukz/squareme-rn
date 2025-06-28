import React, { forwardRef, memo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { AppBottomSheetProps } from "./app-bottom-sheet.types";
import styles from "./app-bottom-sheet.styles";

const AppBottomSheet = forwardRef<BottomSheet, AppBottomSheetProps>(
  (props, ref) => {
    return <BottomSheet ref={ref} {...props} />;
  }
);

AppBottomSheet.displayName = "AppBottomSheet";

export default memo(AppBottomSheet);
