import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import { commonColors } from "@/constants/theme";
import NotificationItem from "./components/notification-item";
import { Notification } from "./components/notification-item/notification-item.types";

const notifications: Notification[] = [
  {
    title: "Request",
    type: "request",
    description:
      '<b>+2348123456789</b> has requested <b>NGN 3,000</b> for "the money for battery."',
    date: "12:30 AM",
    is_read: false,
  },
  {
    title: "Withdrawal",
    type: "withdrawal",
    description:
      "Your withdrawal of <b>NGN 30,000</b> has been successfully deposited into your bank account.",
    date: "12:30 AM",
    is_read: true,
  },
  {
    title: "Request Sent",
    type: "request_sent",
    description:
      'Your request: <b>NGN 30,000</b> for "recharge card" has been delivered to <b>Jim Manor</b>.',
    date: "Yesterday",
    is_read: true,
  },
  {
    title: "Request",
    type: "request",
    description:
      '<b>+2348123456789</b> has requested <b>NGN 3,000</b> for "the money for battery."',
    date: "2 wks ago",
    is_read: false,
  },
  {
    title: "Request Declined",
    type: "request_declined",
    description:
      'Your request: <b>NGN 30,000</b> for "recharge card" has been declined by <b>Jim Manor</b>.',
    date: "1 Month ago",
    is_read: false,
  },
];

const Notifications = () => {
  return (
    <>
      <ScreenHeaderWithBack
        containerStyle={styles.header}
        title="Notifications"
      />

      <FlatList
        style={{ backgroundColor: commonColors.white }}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#F4F5F5",
              marginVertical: verticalScale(22),
            }}
          />
        )}
        data={notifications}
        renderItem={({ item }) => <NotificationItem {...item} />}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
      />
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(18),
  },
  header: {
    paddingHorizontal: horizontalScale(18),
    paddingBottom: verticalScale(18),
  },
});
