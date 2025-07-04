import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  image_style: {
    marginBottom: verticalScale(22),
  },
  transaction_image_style: {
    width: moderateScale(184),
    height: moderateScale(184),
    marginBottom: verticalScale(22),
  },
});
