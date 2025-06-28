import { Image, ScrollView, View } from "react-native";
import React from "react";
import SectionHeader from "@/components/sections/section-header";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import piggy_bank from "@assets/imgs/piggy-bank.png";
import quickactions1 from "@assets/imgs/quickactions1.png";
import Text from "@/components/ui/text";
import { commonColors } from "@/constants/theme";
import { styles } from "./dashboard-suggested-actions.styles";

const actions = [
  {
    bg: commonColors.lightGray,
    img: piggy_bank,
    title: "Earn up to 14% interest \non your locked funds",
  },
  {
    bg: "#D7E5FF",
    title: "Speed up your bills payments",
    img: quickactions1,
  },
];

const DashboardSuggestedActions = () => {
  return (
    <View style={styles.container}>
      <SectionHeader
        containerStyle={styles.sectionHeaderContainer}
        title="Suggested Actions"
      />

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        {actions.map((action) => (
          <View
            key={action.title}
            style={[
              styles.actionItem,
              {
                backgroundColor: action.bg,
              },
            ]}
          >
            <Text
              fontSize={16}
              color={commonColors.basic700}
              fontWeight="500"
              lineHeight={24}
            >
              {action.title}
            </Text>
            <Image
              source={action.img}
              resizeMode="contain"
              style={styles.actionImage}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DashboardSuggestedActions;
