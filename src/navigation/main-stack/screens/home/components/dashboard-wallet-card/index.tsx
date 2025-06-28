import { ImageBackground, Pressable, View } from "react-native";
import React, { useState } from "react";

import styles from "./dasboard-wallet-card.styles";
import { useTheme } from "@/hooks/useTheme";
import bgPattern from "@assets/imgs/dashboard-wallet-bg-pattern.png";
import { ArrowRight2, Copy, Eye } from "iconsax-react-nativejs";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import { handleCopy } from "@/utils";
import Text from "@/components/ui/text";

const DashboardWalletCard = () => {
  const { colors } = useTheme();

  const [isWalletBalanceVisible, setIsWalletBalanceVisible] = useState(false);

  const handleToggleWalletBalance = () => {
    setIsWalletBalanceVisible(!isWalletBalanceVisible);
  };

  const handleCopySquaremeTag = async () => {
    const success = await handleCopy("@davidoloye22");
    if (success) {
      // You could add a toast notification here if needed
      console.log("Squareme tag copied to clipboard");
    }
  };

  return (
    <ImageBackground
      source={bgPattern}
      style={[
        styles.container,
        { overflow: "hidden", backgroundColor: colors.primary500 },
      ]}
    >
      <View style={styles.mainContent}>
        <Pressable
          style={[
            styles.transactionHistoryButton,
            { backgroundColor: colors.darkBlue },
          ]}
        >
          <Text
            fontSize={12}
            lineHeight={convertLineHeightToPixels(150, 12)}
            style={{ color: colors.white }}
          >
            Transaction History
          </Text>
          <ArrowRight2 color={colors.white} size={moderateScale(12)} />
        </Pressable>

        <View style={styles.walletBalanceContainer}>
          <View style={styles.walletBalanceHeader}>
            <Text
              fontSize={12}
              lineHeight={convertLineHeightToPixels(150, 12)}
              style={{ color: colors.white }}
            >
              Wallet Balance
            </Text>

            <Pressable onPress={handleToggleWalletBalance}>
              <Eye size={moderateScale(12)} color={colors.white} />
            </Pressable>
          </View>

          <Text
            fontWeight="500"
            fontSize={24}
            lineHeight={convertLineHeightToPixels(140, 24)}
            style={{ color: colors.white }}
          >
            NGN{" "}
            <Text
              fontWeight="500"
              fontSize={24}
              lineHeight={convertLineHeightToPixels(140, 24)}
              style={{ color: colors.white }}
            >
              {isWalletBalanceVisible ? "100,000" : "********"}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[styles.bottomSection, { backgroundColor: colors.darkBlue }]}
      >
        <View style={styles.squaremTagContainer}>
          <Text
            fontSize={13}
            lineHeight={convertLineHeightToPixels(150, 13)}
            style={{ color: colors.white }}
          >
            Squareme tag: @davidoloye22
          </Text>
          <Pressable onPress={handleCopySquaremeTag}>
            <Copy
              color={colors.magenta}
              strokeWidth={1.5}
              size={moderateScale(16)}
            />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DashboardWalletCard;
