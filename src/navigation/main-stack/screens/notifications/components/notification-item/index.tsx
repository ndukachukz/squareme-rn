import { StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import { Notification } from "./notification-item.types";
import Text from "@/components/ui/text";
import Button from "@/components/ui/button";
import BellIcon from "@/assets/svgs/notification-bell.svg";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";
import { commonColors } from "@/constants/theme";
import { parseHtmlToTextSegments } from "@/utils";

const NotificationItem = ({
  title,
  type,
  description,
  date,
  is_read,
}: Notification) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const renderDescription = () => {
    const segments = parseHtmlToTextSegments(description);

    return (
      <Text>
        {segments.map((segment, index) => (
          <Text key={index} fontWeight={segment.bold ? "500" : "400"}>
            {segment.text}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <BellIcon
          height={moderateScale(20)}
          width={moderateScale(20)}
          stroke={colors.secondary600}
        />
      </View>
      <View style={styles.content_container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text fontSize={13} lineHeight={convertLineHeightToPixels(150, 13)}>
              {title}
            </Text>
            <Text fontSize={13} lineHeight={convertLineHeightToPixels(150, 13)}>
              {date}
            </Text>
          </View>
          {renderDescription()}
        </View>
        {type === "request" && (
          <View style={styles.button_container}>
            <Button style={styles.button} title="Accept" />
            <Button style={styles.button} variant="outline" title="Reject" />
          </View>
        )}
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: horizontalScale(12),
  },
  icon_container: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: moderateScale(100),
    backgroundColor: commonColors.secondary50,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button_container: {
    flexDirection: "row",
    columnGap: horizontalScale(18),
  },
  button: { flex: 1, paddingVertical: verticalScale(14.1) },
  content_container: {
    rowGap: verticalScale(18),
    flex: 1,
  },
  content: {
    rowGap: verticalScale(3),
  },
});
