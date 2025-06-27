import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderRadius: moderateScale(12),
    rowGap: verticalScale(12),
    overflow: "hidden",
  },
  mainContent: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(24),
    rowGap: verticalScale(12),
  },
  transactionHistoryButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
    columnGap: horizontalScale(10),
  },
  walletBalanceContainer: {
    alignSelf: "center",
  },
  walletBalanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    columnGap: horizontalScale(4),
  },
  bottomSection: {
    paddingVertical: verticalScale(9),
  },
  squaremTagContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    columnGap: horizontalScale(7),
  },
});
