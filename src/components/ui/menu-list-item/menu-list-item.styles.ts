import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "@/utils/metrics";

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: moderateScale(18),
  },
  iconContainer: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    rowGap: verticalScale(2),
  },
  itemTitle: {},
  itemDescription: {},
});
