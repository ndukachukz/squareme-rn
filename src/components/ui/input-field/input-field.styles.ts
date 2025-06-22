import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";
import { verticalScale, convertLineHeightToPixels } from "@/utils/metrics";

export default StyleSheet.create({
  container: {
    rowGap: verticalScale(6),
  },
  label: {
    lineHeight: convertLineHeightToPixels(145, 15),
  },
  error: {
    fontSize: 14,
    color: "#FF6B6B",
    marginTop: verticalScale(4),
  },
});
