import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";
import { verticalScale, horizontalScale, moderateScale } from "@/utils/metrics";
import { getFontFamily } from "../text/text.styles";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputFieldBackground,
    height: verticalScale(54),
    borderRadius: 8,
    paddingHorizontal: horizontalScale(16),
    gap: horizontalScale(21),
  },
  input: {
    flex: 1,
    fontFamily: getFontFamily(),
    fontSize: moderateScale(17),
  },
  leftComponent: {
    justifyContent: "center",
    alignItems: "center",
  },
  rightComponent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
