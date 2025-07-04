import { horizontalScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(18),
    paddingTop: verticalScale(13),
    justifyContent: "space-between",
    paddingBottom: verticalScale(24),
  },
  form_container: {
    paddingTop: verticalScale(30),
    rowGap: verticalScale(24),
  },
});
