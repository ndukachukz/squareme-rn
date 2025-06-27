import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import {
  Card,
  LampCharge,
  Mobile,
  Monitor,
  Receipt1,
  Strongbox2,
  WalletAdd1,
  WalletMinus,
} from "iconsax-react-nativejs";
import { SCREEN_WIDTH } from "@/constants";
import { styles } from "./dashboard-quick-actions.styles";
import SectionHeader from "@/components/sections/section-header";

const iconSize = moderateScale(24);

const quickActions = [
  {
    id: 1,
    title: "Fund Wallet",
    icon: <WalletAdd1 size={iconSize} color="#3976e8" variant="Bulk" />,
  },
  {
    id: 2,
    title: "Withdraw",
    icon: <WalletMinus size={iconSize} color="#6368ff" variant="Bulk" />,
  },
  {
    id: 3,
    title: "Pay Bills",
    icon: <Receipt1 size={iconSize} color="#4285F4" variant="Bulk" />,
  },
  {
    id: 4,
    title: "Cards",
    icon: <Card size={iconSize} color="#a057ff" variant="Bulk" />,
  },
  {
    id: 5,
    title: "Squareme Pot",
    icon: <Strongbox2 size={iconSize} color="#6368ff" variant="Bulk" />,
  },
  {
    id: 6,
    title: "Airtime",
    icon: <Mobile size={iconSize} color="#6368ff" variant="Bulk" />,
  },
  {
    id: 7,
    title: "Data",
    icon: <Mobile size={iconSize} color="#7165E3" variant="Bulk" />,
  },
  {
    id: 8,
    title: "Cable TV",
    icon: <Monitor size={iconSize} color="#EA71F5" variant="Bulk" />,
  },
  {
    id: 9,
    title: "Utility",
    icon: <LampCharge size={iconSize} color="#007899" variant="Bulk" />,
  },
];

const DashboardQuickActions = () => {
  const { colors } = useTheme();
  const [showMoreQuickActions, setShowMoreQuickActions] = useState(false);

  const renderQuickAction = ({ item }: { item: (typeof quickActions)[0] }) => (
    <TouchableOpacity
      style={[
        styles.quickActionItem,
        {
          width: (SCREEN_WIDTH - horizontalScale(36) - horizontalScale(48)) / 5,
          backgroundColor: "#F9F9F9",
        },
      ]}
    >
      {typeof item.icon !== "string" && item.icon}

      <Text
        fontSize={8}
        lineHeight={convertLineHeightToPixels(100, 8)}
        style={styles.actionTitle}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const memoizedQuickActions = useMemo(
    () => (showMoreQuickActions ? quickActions : quickActions.slice(0, 5)),
    [showMoreQuickActions]
  );

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Quick Actions"
        actionText={showMoreQuickActions ? "See less" : "See more"}
        onActionPress={() => setShowMoreQuickActions(!showMoreQuickActions)}
      />

      <FlatList
        data={memoizedQuickActions}
        renderItem={renderQuickAction}
        keyExtractor={(item) => item.id.toString()}
        numColumns={5}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DashboardQuickActions;
