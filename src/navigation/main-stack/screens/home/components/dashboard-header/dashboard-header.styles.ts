import { commonColors } from "@/constants/theme";
import { horizontalScale, moderateScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: horizontalScale(8),
  },
  icon_container: {
    position: "relative",
  },
  dot: {
    position: "absolute",
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: 100,
    backgroundColor: commonColors.error500,
  },
});
