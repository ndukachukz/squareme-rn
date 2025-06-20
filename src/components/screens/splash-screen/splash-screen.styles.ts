import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12054A", // Dark purple background matching the animation
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: width * 0.9,
    height: height * 0.7,
  },
});
