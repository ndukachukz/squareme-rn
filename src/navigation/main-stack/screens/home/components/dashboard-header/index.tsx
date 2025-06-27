import { Pressable, View } from "react-native";
import React, { FC } from "react";
import { SvgProps } from "react-native-svg";
import styles from "./dashboard-header.styles";
import { Avatar, Icon } from "react-native-paper";
import Text from "@/components/ui/text";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
} from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";
import GiftIcon from "@assets/svgs/gift.svg";
import NotificationBellIcon from "@assets/svgs/notification-bell.svg";
import { Add } from "iconsax-react-nativejs";

const DashboardHeader = () => {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.avatar_container}>
        <Avatar.Image size={moderateScale(36)} source={{ uri: avatarUrl }} />
        <Text fontSize={14} lineHeight={convertLineHeightToPixels(150, 14)}>
          Hi David,
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: horizontalScale(24),
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            columnGap: horizontalScale(8),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable style={styles.icon_container}>
            <View
              style={{
                backgroundColor: colors.secondary500,
                borderRadius: moderateScale(100),
                width: moderateScale(34),
                height: moderateScale(34),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GiftIcon
                width={moderateScale(22.5)}
                height={moderateScale(22.5)}
              />
            </View>
            <View style={[styles.dot, { right: 4 }]} />
          </Pressable>

          <Pressable style={styles.icon_container}>
            <View
              style={{
                backgroundColor: colors.secondary500,
                borderRadius: moderateScale(100),
                width: moderateScale(34),
                height: moderateScale(34),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Add size={moderateScale(22.5)} color={colors.white} />
            </View>
          </Pressable>
        </View>

        <Pressable style={styles.icon_container}>
          <NotificationBellIcon
            width={moderateScale(22.5)}
            height={moderateScale(22.5)}
          />
          <View style={[styles.dot, { right: 4 }]} />
        </Pressable>
      </View>
    </View>
  );
};

export default DashboardHeader;
