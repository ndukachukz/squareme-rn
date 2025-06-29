import { View, Pressable } from "react-native";
import React, { memo, useCallback, useRef } from "react";
import AppBottomSheet from "@/components/ui/app-bottom-sheet";
import Text from "@/components/ui/text";
import MenuListItem from "@/components/ui/menu-list-item";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  CloseCircle,
  Flash,
  MonitorRecorder,
  Card,
  Mobile,
  TruckFast,
  Strongbox2,
} from "iconsax-react-nativejs";
import { moderateScale } from "@/utils/metrics";
import { useTheme } from "@/hooks/useTheme";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Section } from "./more.types";
import { styles } from "./more.styles";
import Separator from "@/components/ui/separator";

const sections: Section[] = [
  {
    title: "Bill Payments",
    items: [
      {
        title: "Buy airtime",
        description: "Pay all your bills on squareme",
        icon: (
          <Mobile size={moderateScale(24)} color="#3F85F3" variant="Bulk" />
        ),
        iconContainerBg: "#ECF3FE",
      },
      {
        title: "Purchase electricity units",
        description: "Stay connected by purchasing electricity units",
        icon: <Flash size={moderateScale(24)} color="#F98B4E" variant="Bulk" />,
        iconContainerBg: "#FFF2E5",
      },
      {
        title: "Subscribe your Cable TV",
        description: "Subscribe now for nonstop entertainment",
        iconContainerBg: "#F5EBFE",
        icon: (
          <MonitorRecorder
            size={moderateScale(24)}
            color="#BA70FA"
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
        icon: <Card size={moderateScale(24)} color="#A057FF" variant="Bulk" />,
        iconContainerBg: "#F6EBFE",
      },
      {
        title: "Request a delivery address",
        description: "Request an address to enable you shop like a local",
        icon: (
          <TruckFast size={moderateScale(24)} color="#3976E8" variant="Bulk" />
        ),
        iconContainerBg: "#ECF3FE",
      },
    ],
  },
  {
    title: "Savings & Investment",
    items: [
      {
        title: "Create POT",
        description: "Earn up to 14% interest on locked funds",
        iconContainerBg: "#EEEEFF",
        icon: (
          <Strongbox2 size={moderateScale(24)} color="#6368FF" variant="Bulk" />
        ),
      },
    ],
  },
];

const More = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const ref = useRef<BottomSheet>(null);

  const handleClose = useCallback(() => {
    ref.current?.close();
    navigation.canGoBack() && navigation.goBack();
  }, []);

  useFocusEffect(
    useCallback(() => {
      ref.current?.expand();

      return () => {
        ref.current?.close();
      };
    }, [])
  );

  return (
    <AppBottomSheet ref={ref} handleComponent={null}>
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
                    <MenuListItem
                      icon={item.icon}
                      iconContainerBgColor={item.iconContainerBg}
                      title={item.title}
                      description={item.description}
                      onPress={() => {
                        // Handle item press here
                        console.log(`Pressed: ${item.title}`);
                      }}
                    />
                    {itemIndex < section.items.length - 1 && <Separator />}
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
