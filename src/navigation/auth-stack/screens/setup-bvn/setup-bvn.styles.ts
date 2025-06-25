import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, moderateScale } from "@/utils/metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    rowGap: verticalScale(30),
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(13),
  },
  content: {
    justifyContent: "space-between",
  },
  headerSection: {
    rowGap: verticalScale(30),
  },
  infoSection: {
    marginTop: verticalScale(40), // 40 gap between field and info accordion
  },
  infoBox: {
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  chevronContainer: {
    padding: moderateScale(4),
  },
  infoContent: {
    marginTop: verticalScale(16), // 16 gap between title and items
    rowGap: verticalScale(12),
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: horizontalScale(8),
  },
  bullet: {
    fontSize: moderateScale(14),
    color: "#9F56D4",
    marginTop: verticalScale(2),
  },
  bulletText: {
    flex: 1,
  },
});
