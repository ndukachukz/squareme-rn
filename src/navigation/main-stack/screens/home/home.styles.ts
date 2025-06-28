import { horizontalScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    rowGap: verticalScale(41),
    paddingBottom: verticalScale(20),
  },
  header_container: {
    paddingHorizontal: horizontalScale(18),
    paddingTop: verticalScale(37),
    rowGap: verticalScale(25),
  },
});
