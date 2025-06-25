import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "@/utils/metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(13),
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: verticalScale(30),
  },
  formSection: {
    flex: 1,
    paddingTop: verticalScale(20),
    rowGap: verticalScale(30),
  },
  description: {
    marginBottom: verticalScale(10),
  },
  footer: {
    paddingTop: verticalScale(20),
  },
});
