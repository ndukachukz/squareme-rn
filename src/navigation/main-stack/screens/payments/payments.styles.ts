import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale } from "@/utils/metrics";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(13),
    rowGap: verticalScale(41),
  },
  headerContainer: {
    paddingHorizontal: horizontalScale(18),
  },
  mainContent: {
    rowGap: verticalScale(32),
  },
  menuSection: {
    rowGap: verticalScale(14),
    paddingHorizontal: horizontalScale(18),
  },
  transactionsSection: {
    rowGap: verticalScale(16),
  },
  sectionHeaderContainer: {
    paddingHorizontal: horizontalScale(18),
  },
  transactionsContent: {
    rowGap: verticalScale(32),
  },
  transactionsContainer: {
    paddingHorizontal: horizontalScale(18),
  },
  transactionItem: {
    flexDirection: "row",
    columnGap: horizontalScale(16),
  },
  transactionDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionInfo: {
    rowGap: verticalScale(8),
  },
  transactionAmount: {
    textAlignVertical: "bottom",
  },
  pillButtonContainer: {
    alignSelf: "center",
  },
  referralSection: {
    paddingHorizontal: horizontalScale(18),
  },
  referralCard: {
    position: "relative",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(19),
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 10,
  },
  referralContent: {
    rowGap: verticalScale(8),
  },
  referralTextContainer: {
    rowGap: verticalScale(10),
  },
  referralImage: {
    width: horizontalScale(90.09),
    height: verticalScale(84.57),
    position: "absolute",
    right: horizontalScale(18),
    top: verticalScale(15),
  },
});

// Color-dependent styles function
export const getColorStyles = (colors: any) =>
  StyleSheet.create({
    referralButton: {
      backgroundColor: colors.white,
      borderRadius: 8,
      paddingVertical: verticalScale(8.5),
      paddingHorizontal: horizontalScale(8),
      alignSelf: "flex-start",
    },
  });

// Style arrays for components that accept multiple styles
export const getStyleArrays = (colors: any) => ({
  pillButtonStyle: [styles.pillButtonContainer],
  referralButtonStyle: [getColorStyles(colors).referralButton],
  transactionAmountStyle: [styles.transactionAmount],
});
