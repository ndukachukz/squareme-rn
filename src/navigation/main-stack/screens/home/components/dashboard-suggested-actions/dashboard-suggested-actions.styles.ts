import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "@/utils/metrics";

export const styles = StyleSheet.create({
  container: {
    rowGap: verticalScale(16),
  },
  sectionHeaderContainer: {
    paddingHorizontal: horizontalScale(18),
  },
  scrollViewContent: {
    paddingHorizontal: horizontalScale(18),
    columnGap: horizontalScale(16),
  },
  actionItem: {
    width: horizontalScale(270),
    padding: 24,
    borderRadius: 16,
  },
  actionImage: {
    alignSelf: "center",
    width: horizontalScale(200),
    height: verticalScale(200),
  },
});
