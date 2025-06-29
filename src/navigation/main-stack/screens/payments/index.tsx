import { Image, ImageBackground, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import { convertLineHeightToPixels, moderateScale } from "@/utils/metrics";
import ScreenHeader from "@/components/sections/screen-header";
import MenuListItem from "@/components/ui/menu-list-item";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRight2,
  Message2,
} from "iconsax-react-nativejs";
import Separator from "@/components/ui/separator";
import SectionHeader from "@/components/sections/section-header";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import PillButton from "@/components/ui/pill-button";
import referralCardBg from "@assets/imgs/referral-code-card-bg.png";
import handingGiftIllus from "@assets/imgs/handing-gift-illus.png";
import Button from "@/components/ui/button";
import { styles, getColorStyles } from "./payments.styles";
import { useNavigation } from "@react-navigation/native";

const Payments = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const colorStyles = getColorStyles(colors);

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <ScreenHeader containerStyle={styles.headerContainer} title="Payments" />

      <View style={styles.mainContent}>
        <View style={styles.menuSection}>
          <MenuListItem
            icon={<ArrowRight size={23} color={"#3976E8"} />}
            iconContainerBgColor={"#F1F5FD"}
            title={"Send Money"}
            description={"Send money to anyone instantly"}
            onPress={() => {
              navigation.navigate("MainStack", {
                screen: "PaymentInput",
                params: {
                  type: "send",
                },
              });
            }}
          />
          <Separator />
          <MenuListItem
            icon={<ArrowLeft size={23} color={"#4B7F1E"} />}
            iconContainerBgColor={"#F2FAEB"}
            title={"Request Money"}
            description={"Request money from your friends and family"}
            onPress={() => {
              navigation.navigate("MainStack", {
                screen: "PaymentInput",
                params: {
                  type: "request",
                },
              });
            }}
          />
        </View>

        <View style={styles.transactionsSection}>
          <SectionHeader
            containerStyle={styles.sectionHeaderContainer}
            title="Recent transactions"
            titleColor="#656565"
          />

          <View style={styles.transactionsContent}>
            <View style={styles.transactionsContainer}>
              {/* transaction item */}
              <View style={styles.transactionItem}>
                <Message2 color="#6368FFBA" size={20} variant="TwoTone" />
                <View style={styles.transactionDetails}>
                  <View style={styles.transactionInfo}>
                    <Text
                      fontWeight="500"
                      lineHeight={convertLineHeightToPixels(150, 15)}
                      fontSize={15}
                    >
                      Withdrawal to Bank
                    </Text>
                    <Text
                      fontSize={14}
                      lineHeight={convertLineHeightToPixels(150, 14)}
                      color={colors.gray300}
                    >
                      0095649856 GIFT OLUWAS......
                    </Text>
                  </View>

                  <Text
                    fontSize={15}
                    fontWeight="500"
                    color={colors.gray500}
                    style={styles.transactionAmount}
                  >
                    ₦ 30,000.00
                  </Text>
                </View>
              </View>
              {/* transaction item */}
            </View>

            <PillButton
              text="See more"
              textProps={{
                color: colors.gray300,
              }}
              style={styles.pillButtonContainer}
              icon={
                <ArrowRight2 size={moderateScale(10)} color={colors.gray300} />
              }
            />
          </View>
          <Separator />
        </View>

        <View style={styles.referralSection}>
          <ImageBackground source={referralCardBg} style={styles.referralCard}>
            <View style={styles.referralContent}>
              <View style={styles.referralTextContainer}>
                <Text
                  color="white"
                  fontSize={17}
                  fontWeight="600"
                  lineHeight={convertLineHeightToPixels(150, 17)}
                >
                  Refer your friends and earn {"\n"}rewards
                </Text>
                <Text
                  color={colors.white}
                  fontSize={12}
                  lineHeight={convertLineHeightToPixels(150, 12)}
                >
                  Refer your friends using your username/tag and earn {"\n"}
                  rewards on each referral
                </Text>
              </View>
              <Button
                textFontSize={10}
                textFontWeight="500"
                textColor={colors.basic700}
                style={colorStyles.referralButton}
                title="Copy referral code"
              />
            </View>
            <Image
              source={handingGiftIllus}
              style={styles.referralImage}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Payments;
