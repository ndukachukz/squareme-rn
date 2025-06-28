import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import React, { memo, useCallback, useMemo, useRef } from "react";
import AppBottomSheet from "@/components/ui/app-bottom-sheet";
import Text from "@/components/ui/text";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  CloseCircle,
  Call,
  Flash,
  MonitorRecorder,
  Card,
  Truck,
  MoneyRecive,
} from "iconsax-react-nativejs";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

interface SectionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Section {
  title: string;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    title: "Bill Payments",
    items: [
      {
        title: "Buy airtime",
        description: "Pay all your bills on squareme",
        icon: <Call size={moderateScale(24)} color="#2196F3" variant="Bulk" />,
      },
      {
        title: "Purchase electricity units",
        description: "Stay connected by purchasing electricity units",
        icon: <Flash size={moderateScale(24)} color="#FF9800" variant="Bulk" />,
      },
      {
        title: "Subscribe your Cable TV",
        description: "Subscribe now for nonstop entertainment",
        icon: (
          <MonitorRecorder
            size={moderateScale(24)}
            color="#9C27B0"
            variant="Bulk"
          />
        ),
      },
    ],
  },
  {
    title: "Cards",
    items: [
      {
        title: "Top up your virtual card",
        description: "Avoid failed transactions by topping up your card",
        icon: <Card size={moderateScale(24)} color="#9C27B0" variant="Bulk" />,
      },
      {
        title: "Request a delivery address",
        description: "Request an address to enable you shop like a local",
        icon: <Truck size={moderateScale(24)} color="#2196F3" variant="Bulk" />,
      },
    ],
  },
  {
    title: "Savings & Investment",
    items: [
      {
        title: "Create POT",
        description: "Earn up to 14% interest on locked funds",
        icon: (
          <MoneyRecive
            size={moderateScale(24)}
            color="#2196F3"
            variant="Bulk"
          />
        ),
      },
    ],
  },
];

const More = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const ref = useRef<BottomSheet>(null);

  const handleClose = useCallback(
    () => ref.current?.close(),
    [ref.current?.close]
  );

  useFocusEffect(
    useCallback(() => {
      ref.current?.expand();

      return () => {
        ref.current?.close();
      };
    }, [])
  );

  return (
    <AppBottomSheet
      ref={ref}
      handleComponent={null}
      onClose={navigation.canGoBack() ? navigation.goBack : undefined}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={handleClose}>
          <CloseCircle size={moderateScale(24)} color={colors.gray500} />
        </Pressable>

        <View style={styles.content}>
          {sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text
                fontWeight="500"
                fontSize={15}
                lineHeight={22.5}
                color={colors.basic700}
                style={styles.sectionTitle}
              >
                {section.title}
              </Text>
              <View style={styles.itemsContainer}>
                {section.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <TouchableOpacity style={styles.item}>
                      <View style={styles.iconContainer}>{item.icon}</View>
                      <View style={styles.textContainer}>
                        <Text
                          fontWeight="500"
                          fontSize={15}
                          lineHeight={22.5}
                          style={styles.itemTitle}
                        >
                          {item.title}
                        </Text>
                        <Text
                          fontSize={14}
                          lineHeight={21}
                          color={colors.secondaryText}
                          style={styles.itemDescription}
                        >
                          {item.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {itemIndex < section.items.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          ))}
        </View>
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
};

export default memo(More);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F9FC",
    rowGap: verticalScale(40),
    paddingHorizontal: horizontalScale(18),
    paddingTop: verticalScale(22),
  },
  content: {
    rowGap: verticalScale(24),
    paddingBottom: verticalScale(47),
  },
  section: {
    rowGap: verticalScale(12),
  },
  sectionTitle: {},
  itemsContainer: {
    borderRadius: 16,
    paddingHorizontal: moderateScale(18),
    backgroundColor: "#fff",
    paddingVertical: verticalScale(20),
    rowGap: verticalScale(16),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: moderateScale(18),
  },
  iconContainer: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(12),
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
  separator: {
    height: 1,
    backgroundColor: "#F4F5F5",
  },
});
