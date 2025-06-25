import { StyleSheet } from "react-native";
import {
  convertLineHeightToPixels,
  horizontalScale,
  verticalScale,
} from "@/utils/metrics";

export default StyleSheet.create({
  envelopeImage: {
    marginBottom: verticalScale(24.67),
    width: horizontalScale(230),
    height: verticalScale(199.3333282470703),
  },
  title: {
    fontSize: 24,
    lineHeight: convertLineHeightToPixels(135, 24),
    marginBottom: verticalScale(18),
  },
  description: {
    textAlign: "center",
    lineHeight: convertLineHeightToPixels(145, 15),
  },
});
