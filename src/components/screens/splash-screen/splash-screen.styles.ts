import { horizontalScale, verticalScale } from "@/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#120542",
  },
  animation: {
    width: width * 2.3,
    height: height * 2,
  },
});
