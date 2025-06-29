import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F9FC",
    rowGap: verticalScale(40),
    paddingHorizontal: horizontalScale(18),
    paddingTop: verticalScale(22),
  },
  content: {
    rowGap: verticalScale(24),
    paddingBottom: verticalScale(47),
  },
  section: {
    rowGap: verticalScale(12),
  },
  sectionTitle: {},
  itemsContainer: {
    borderRadius: 16,
    paddingHorizontal: moderateScale(18),
    backgroundColor: "#fff",
    paddingVertical: verticalScale(20),
    rowGap: verticalScale(16),
  },
});
