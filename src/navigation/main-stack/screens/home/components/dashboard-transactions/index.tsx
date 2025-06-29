import { Pressable, View } from "react-native";
import React, { useMemo, useState } from "react";
import { convertLineHeightToPixels, moderateScale } from "@/utils/metrics";
import SectionHeader from "@/components/sections/section-header";
import Text from "@/components/ui/text";
import PillButton from "@/components/ui/pill-button/index";
import ChevronDown from "@assets/svgs/chevron-down.svg";
import { Moneys } from "iconsax-react-nativejs";
import { useTheme } from "@/hooks/useTheme";
import { useAmountVisibilityStore } from "@/store";
import { formatDate, formatAmount, getStatus } from "@/utils";
import { styles } from "./dashboard-transactions.styles";
import { mockTransactions } from "./dashboard-transactions.data";
import { useNavigation } from "@react-navigation/native";

const DashboardTransactions = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { isAmountVisible } = useAmountVisibilityStore();
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const toggleSeeMore = () => setShouldShowMore((seeMore) => !seeMore);

  const memoizedTransactions = useMemo(
    () => (shouldShowMore ? mockTransactions : mockTransactions.slice(0, 2)),
    [shouldShowMore]
  );

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Transactions"
        actionText="View all"
        onActionPress={() =>
          navigation.navigate("MainStack", {
            screen: "Transactions",
          })
        }
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
                {isAmountVisible ? formatAmount(transaction.amount) : "****"}
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

        <PillButton
          text="See more"
          onPress={toggleSeeMore}
          icon={
            <ChevronDown width={moderateScale(10)} height={moderateScale(10)} />
          }
          style={styles.see_more_btn}
        />
      </View>
    </View>
  );
};

export default DashboardTransactions;
