import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderRadius: moderateScale(12),
    rowGap: verticalScale(12),
  },
});
