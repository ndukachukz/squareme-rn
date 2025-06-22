import { horizontalScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(19),
    rowGap: verticalScale(51),
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: horizontalScale(141),
    height: verticalScale(23),
  },

  content: {
    flex: 1,
    rowGap: verticalScale(32),
  },
  titleSection: {
    gap: verticalScale(12),
  },
  formSection: {
    gap: verticalScale(16),
  },

  footer: {
    rowGap: verticalScale(24),
  },
  footer_cta: {
    rowGap: verticalScale(12),
  },
  footer_link: {
    textAlign: "center",
  },
});
