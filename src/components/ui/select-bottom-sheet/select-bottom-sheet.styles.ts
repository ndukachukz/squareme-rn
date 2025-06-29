import { commonColors } from "@/constants/theme";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(20),
    rowGap: verticalScale(20),
  },
  sheet_background: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheet_handle: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    height: verticalScale(5),
    width: horizontalScale(38),
  },
  options_container: {
    rowGap: verticalScale(16),
  },
  left_container: {
    borderRadius: 100,
    width: horizontalScale(35),
    height: verticalScale(35),
    backgroundColor: commonColors.secondary50,
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  option_content: {
    columnGap: horizontalScale(16),
    flexDirection: "row",
    alignItems: "center",
  },
});
