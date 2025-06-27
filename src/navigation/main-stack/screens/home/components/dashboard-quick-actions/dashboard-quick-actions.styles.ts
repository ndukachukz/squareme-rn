import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(18),
    rowGap: verticalScale(16),
  },
  listContainer: {
    gap: verticalScale(16),
  },
  row: {
    justifyContent: "space-between",
    columnGap: horizontalScale(12),
  },
  quickActionItem: {
    borderRadius: moderateScale(7),
    alignItems: "center",
    gap: verticalScale(6),
    paddingHorizontal: horizontalScale(7),
    paddingVertical: verticalScale(13),
  },
  actionTitle: {
    textAlign: "center",
  },
});
