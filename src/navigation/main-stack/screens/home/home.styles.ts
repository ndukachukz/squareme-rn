import { horizontalScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(37),
    rowGap: verticalScale(25),
  },
});
