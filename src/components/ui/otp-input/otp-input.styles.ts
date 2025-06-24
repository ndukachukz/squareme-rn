import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, moderateScale } from "@/utils/metrics";
import { getFontFamily } from "../text/text.styles";

export default StyleSheet.create({
  container: {
    width: "100%",
    gap: verticalScale(8),
  },
  label: {
    marginBottom: verticalScale(6),
    fontSize: moderateScale(15),
    fontFamily: getFontFamily(),
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  input: {
    flex: 1,
    height: verticalScale(56),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F3F4F7",
    borderColor: "#E5E7EB",
  },
  focusedInput: {
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  errorInput: {
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    borderColor: "#D1D5DB",
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    fontSize: moderateScale(18),
    textAlign: "center",
    color: "transparent",
  },
  digitText: {
    fontSize: moderateScale(18),
    fontFamily: getFontFamily("ClashGrotesk", "500"),
    textAlign: "center",
    lineHeight: moderateScale(24),
  },
  secureTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  secureTextDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
  },
  error: {
    fontSize: moderateScale(14),
    color: "#FF6B6B",
    marginTop: verticalScale(4),
    fontFamily: getFontFamily(),
  },
});
