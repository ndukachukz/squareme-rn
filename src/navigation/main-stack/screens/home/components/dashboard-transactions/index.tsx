import { Pressable, StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import SectionHeader from "@/components/sections/section-header";
import Text from "@/components/ui/text";
import { Icon } from "react-native-paper";
import ChevronDown from "@assets/svgs/chevron-down.svg";
import { Moneys } from "iconsax-react-nativejs";
import { useTheme } from "@/hooks/useTheme";
import { PlatformPressable } from "@react-navigation/elements";
import { Transaction } from "@/types/transactions.types";
import { formatDate, formatAmount, getStatus } from "@/utils";

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    description: "Walmart Supercenter",
    amount: -87.45,
    date: "2024-01-15T18:30:00",
    status: "completed",
  },
  {
    id: "2",
    title: "Salary Deposit",
    description: "Monthly salary payment",
    amount: 3250.0,
    date: "2024-01-14T09:15:00",
    status: "completed",
  },
  {
    id: "3",
    title: "Coffee & Breakfast",
    description: "Starbucks Downtown",
    amount: -12.75,
    date: "2024-01-13T08:45:00",
    status: "completed",
  },
  {
    id: "4",
    title: "Online Transfer",
    description: "Transfer to John Doe",
    amount: -150.0,
    date: "2024-01-12T14:20:00",
    status: "pending",
  },
  {
    id: "5",
    title: "Gas Station",
    description: "Shell Station Main St",
    amount: -65.3,
    date: "2024-01-11T16:55:00",
    status: "failed",
  },
  {
    id: "6",
    title: "Freelance Payment",
    description: "Design project completion",
    amount: 450.0,
    date: "2024-01-10T11:30:00",
    status: "completed",
  },
];

const DashboardTransactions = () => {
  const { colors } = useTheme();
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const toggleSeeMore = () => setShouldShowMore((seeMore) => !seeMore);

  const memoizedTransactions = useMemo(
    () => (shouldShowMore ? transactions : transactions.slice(0, 2)),
    [shouldShowMore]
  );

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Transactions"
        actionText="View all"
        onActionPress={() => {}}
      />

      <View style={styles.content_container}>
        {memoizedTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.item}>
            <View style={styles.transaction_info_container}>
              <View style={styles.transaction_icon}>
                <Moneys
                  size={moderateScale(24)}
                  color="#F99F4D"
                  variant="Bulk"
                />
              </View>

              <View style={styles.transaction_info}>
                <Text
                  fontSize={15}
                  lineHeight={convertLineHeightToPixels(150, 15)}
                >
                  {transaction.title}
                </Text>
                <Text
                  fontSize={13}
                  lineHeight={convertLineHeightToPixels(120, 13)}
                  color={colors.gray300}
                >
                  {formatDate(transaction.date)}
                </Text>
              </View>
            </View>

            <View style={styles.transaction_meta}>
              <Text
                fontSize={15}
                lineHeight={convertLineHeightToPixels(150, 15)}
              >
                {formatAmount(transaction.amount)}
              </Text>
              <Text
                fontSize={13}
                lineHeight={convertLineHeightToPixels(150, 13)}
                color={
                  transaction.status === "completed"
                    ? colors.success600
                    : colors.error600
                }
              >
                {getStatus(transaction.status)}
              </Text>
            </View>
          </View>
        ))}

        <Pressable onPress={toggleSeeMore} style={styles.see_more_btn}>
          <Text
            fontWeight="500"
            fontSize={10}
            lineHeight={convertLineHeightToPixels(150, 10)}
            color={colors.tertiary500}
          >
            See more
          </Text>
          <ChevronDown width={moderateScale(10)} height={moderateScale(10)} />
        </Pressable>
      </View>
    </View>
  );
};

export default DashboardTransactions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(18),
    rowGap: verticalScale(16),
  },

  content_container: {
    padding: moderateScale(12),
    rowGap: verticalScale(12),

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.078,
    shadowRadius: 8,
    elevation: 4,
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
    flex: 1,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E4E9F2",
    borderRadius: 12,
    alignSelf: "center",
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4.5),
    backgroundColor: "#FFF",
  },
});
