import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { StyleSheet } from "react-native";

export const TITLE_TICKER_HEIGHT = verticalScale(70);
export const DESCRIPTION_TICKER_HEIGHT = verticalScale(19);

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  pager_view: {
    flex: 1,
  },
  image_background: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notification: {
    position: "absolute",
    width: horizontalScale(240),
    height: verticalScale(46.27),
  },
  notification_1: {
    left: horizontalScale(11),
    top: verticalScale(125),
    transform: [{ rotate: "-10deg" }],
  },
  notification_2: {
    right: horizontalScale(4),
    top: verticalScale(80),
    transform: [{ rotate: "13deg" }],
  },

  image: {
    transform: [{ scale: 1.4 }],
    height: "100%",
    position: "absolute",
  },
  indicator_wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: horizontalScale(8),
  },
  indicator: {
    width: horizontalScale(28),
    height: verticalScale(5),
    borderRadius: moderateScale(7),
  },
  content_wrapper: {
    rowGap: verticalScale(24),
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(24),
  },
  title: {
    textAlign: "center",
    lineHeight: verticalScale(35),
  },
  description: {
    textAlign: "center",
  },
  cta_wrapper: {
    rowGap: verticalScale(12),
  },
  ticker_container: {
    rowGap: verticalScale(24),
  },
  title_ticker_container: {
    height: TITLE_TICKER_HEIGHT,
    overflow: "hidden",
  },
  description_ticker_container: {
    height: DESCRIPTION_TICKER_HEIGHT,
    overflow: "hidden",
  },
});
