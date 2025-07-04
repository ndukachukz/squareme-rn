import { Platform, StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(18),
    rowGap: verticalScale(16),
  },

  content_container: {
    padding: moderateScale(12),
    rowGap: verticalScale(12),
    borderRadius: 8,

    ...Platform.select({
      android: {
        shadowColor: "rgba(0,0,0, 0.15)",
        elevation: 1,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
    }),
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(8),
  },

  transaction_icon: {
    paddingVertical: verticalScale(11),
    backgroundColor: "#FFF4EB",
    borderRadius: 10,
    width: horizontalScale(42.41895294189453),
    height: verticalScale(45),
    alignItems: "center",
    justifyContent: "center",
  },

  transaction_info_container: {
    flexDirection: "row",
    columnGap: horizontalScale(17),
  },

  transaction_info: {
    rowGap: verticalScale(2),
  },

  transaction_meta: {
    alignItems: "flex-end",
    rowGap: verticalScale(2),
  },

  status_indicator: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
  },

  see_more_btn: {
    marginBottom: verticalScale(-12),
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
});
