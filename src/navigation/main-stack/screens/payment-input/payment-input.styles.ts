import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "@/utils/metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#0C0C26",
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(32),
    paddingHorizontal: horizontalScale(18),
    rowGap: verticalScale(24),
  },
  wallet_info: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    alignSelf: "center",
    alignItems: "center",
    rowGap: verticalScale(4),
    borderRadius: 12,
    backgroundColor: "#9F56D41A",
  },
  select_trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: "#38225A",
    alignItems: "center",
    borderRadius: 6,
  },
  amount_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(20),
  },
  currency: {},
  amount: {},
});
