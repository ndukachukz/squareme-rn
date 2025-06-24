import { horizontalScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(18),
    justifyContent: "space-between",
    paddingVertical: verticalScale(30),
  },
  content_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: verticalScale(6),
  },
});
