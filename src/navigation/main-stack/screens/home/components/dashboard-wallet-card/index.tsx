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
import Text from "@/components/ui/text";

const DashboardWalletCard = () => {
  const { colors } = useTheme();

  const [isWalletBalanceVisible, setIsWalletBalanceVisible] = useState(false);

  const handleToggleWalletBalance = () => {
    setIsWalletBalanceVisible(!isWalletBalanceVisible);
  };

  return (
    <ImageBackground
      source={bgPattern}
      style={[
        styles.container,
        { overflow: "hidden", backgroundColor: colors.primary500 },
      ]}
      //   resizeMode="cover"
    >
      <View
        style={{
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(24),
          rowGap: verticalScale(12),
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            paddingHorizontal: horizontalScale(12),
            paddingVertical: verticalScale(6),
            backgroundColor: "#000942",
            borderRadius: moderateScale(16),
            columnGap: horizontalScale(10),
          }}
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

        <View style={{ alignSelf: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              columnGap: horizontalScale(4),
            }}
          >
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
        style={{
          backgroundColor: "#000942",
          paddingVertical: verticalScale(9),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            alignSelf: "center",
            columnGap: horizontalScale(7),
          }}
        >
          <Text
            fontSize={13}
            lineHeight={convertLineHeightToPixels(150, 13)}
            style={{ color: colors.white }}
          >
            Squareme tag: @davidoloye22
          </Text>
          <Pressable>
            <Copy
              color={"#9F56D4"}
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
