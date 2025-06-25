import React, { useState } from "react";
import { View, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import InputField from "@/components/ui/input-field";
import Button from "@/components/ui/button";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import KeyboardAwareView from "@/components/ui/keyboard-aware-view";
import { Icon } from "react-native-paper";
import ChevronUp from "@assets/svgs/chevron-up.svg";
import ShieldTick from "@assets/svgs/shield-tick.svg";
import { convertLineHeightToPixels } from "@/utils/metrics";
import styles from "./setup-bvn.styles";

const SetupBVN: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [bvn, setBvn] = useState("");
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

  const handleSubmit = () => {
    navigation.navigate("AuthStack", {
      screen: "StayInLoop",
    });
  };

  const toggleInfoExpansion = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeaderWithBack title="Provide your BVN" />

      <KeyboardAwareView contentContainerStyle={styles.content}>
        <View>
          {/* Header and Description Section with 30 gap */}
          <View style={styles.headerSection}>
            <Text fontSize={15} lineHeight={convertLineHeightToPixels(145, 15)}>
              Kindly provide your Bank Verification Number
            </Text>

            <InputField
              placeholder="Click to add"
              value={bvn}
              label="BVN"
              onChangeText={setBvn}
              keyboardType="numeric"
              maxLength={11}
            />
          </View>

          <View style={styles.infoSection}>
            <Pressable
              style={[styles.infoBox, { backgroundColor: "#F6EFFB" }]}
              onPress={toggleInfoExpansion}
            >
              <View style={styles.infoHeader}>
                <View style={styles.infoTitleContainer}>
                  <ShieldTick width={16} height={19} />
                  <Text
                    fontSize={16}
                    fontWeight="500"
                    style={{ color: "#9F56D4" }}
                  >
                    Why we need your BVN?
                  </Text>
                </View>
                <View
                  style={[
                    styles.chevronContainer,
                    {
                      transform: [
                        { rotate: isInfoExpanded ? "0deg" : "180deg" },
                      ],
                    },
                  ]}
                >
                  <ChevronUp width={12} height={8} />
                </View>
              </View>

              {isInfoExpanded && (
                <View style={styles.infoContent}>
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text
                      fontSize={14}
                      lineHeight={convertLineHeightToPixels(150, 14)}
                      style={[styles.bulletText, { color: colors.gray500 }]}
                    >
                      We request for your BVN to verify your identity and
                      confirm that the account you provided is yours.
                    </Text>
                  </View>

                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text
                      fontSize={14}
                      lineHeight={convertLineHeightToPixels(150, 14)}
                      style={[styles.bulletText, { color: colors.gray500 }]}
                    >
                      Only access to your full name, phone number and date of
                      birth is granted.
                    </Text>
                  </View>

                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text
                      fontSize={14}
                      lineHeight={convertLineHeightToPixels(150, 14)}
                      style={[styles.bulletText, { color: colors.gray500 }]}
                    >
                      Your BVN does not grant access to bank accounts or
                      transaction details.
                    </Text>
                  </View>

                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text
                      fontSize={14}
                      lineHeight={convertLineHeightToPixels(150, 14)}
                      style={[styles.bulletText, { color: colors.gray500 }]}
                    >
                      Rest assured, your data is securely managed by us.
                    </Text>
                  </View>
                </View>
              )}
            </Pressable>
          </View>
        </View>
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={bvn.length !== 11}
        />
      </KeyboardAwareView>
    </SafeAreaView>
  );
};

export default SetupBVN;
