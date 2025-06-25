import { StyleSheet } from "react-native";
import {
  horizontalScale,
  verticalScale,
  convertLineHeightToPixels,
} from "@/utils/metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(18),
    rowGap: verticalScale(53),
  },
  content: {
    flex: 1,
    paddingTop: verticalScale(20),
    rowGap: verticalScale(46),
  },
  description: {
    textAlign: "left",
  },
  otpContainer: {},
});
