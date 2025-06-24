import {
  Image,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Text from "@components/ui/text";
import InputField from "@components/ui/input-field";
import KeyboardAwareView from "@components/ui/keyboard-aware-view";
import styles from "./register.styles";
import { useTheme } from "@/hooks/useTheme";
import logo from "@assets/imgs/logo.png";
import HelpCircle from "@assets/svgs/help-circel.svg";
import {
  convertLineHeightToPixels,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/utils/metrics";
import { useFormik } from "formik";
import { RegisterFormData, registerValidationSchema } from "./register.types";
import nigerianFlag from "@assets/imgs/country-flag.png";
import Button from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { formatPhoneNumber } from "@/utils";

const Register = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    formik.setFieldValue("phone", formatted);
  };

  const formik = useFormik<RegisterFormData>({
    initialValues: {
      phone: "",
      referralCode: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit(data) {
      // Clean phone number for submission (remove spaces but keep +234)
      const cleanPhone = data.phone.replace(/\s/g, "");
      navigation.navigate("AuthStack", {
        screen: "VerifyPhone",
        params: {
          phone: cleanPhone,
        },
      });
    },
  });

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background }]}>
      <KeyboardAwareView
        contentContainerStyle={[styles.container]}
        extraHeight={20}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <HelpCircle width={horizontalScale(24)} height={verticalScale(24)} />
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text
              fontSize={20}
              fontWeight="500"
              style={{ lineHeight: convertLineHeightToPixels(140, 20) }}
            >
              Create an account
            </Text>
            <Text
              fontSize={15}
              style={{ lineHeight: convertLineHeightToPixels(145, 15) }}
            >
              Enter your phone number and we'll send an SMS with a code to
              verify your phone number.
            </Text>
          </View>
          <View style={styles.formSection}>
            <InputField
              label="Phone Number"
              placeholder="+234 080 000 0000"
              leftComponent={
                <Image
                  source={nigerianFlag}
                  resizeMode="contain"
                  style={{
                    width: moderateScale(32),
                    height: moderateScale(32),
                  }}
                />
              }
              value={formik.values.phone}
              onChangeText={handlePhoneChange}
              onBlur={formik.handleBlur("phone")}
              error={formik.errors.phone ?? undefined}
              keyboardType="phone-pad"
            />

            <InputField
              label="Refferal Code (Optional)"
              placeholder="Enter referral code"
              value={formik.values.referralCode}
              onChangeText={formik.handleChange("referralCode")}
              onBlur={formik.handleBlur("referralCode")}
              error={formik.errors.referralCode ?? undefined}
            />
          </View>

          <Text fontSize={15}>
            By signing up, you accept our{" "}
            <Text fontSize={15} style={{ color: colors.tertiary400 }}>
              Terms & Conditions
            </Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footer_cta}>
            <Button title="Next" onPress={formik.handleSubmit} />
            <Text fontSize={15} style={styles.footer_link}>
              Already have an account?{" "}
              <Text
                fontSize={15}
                style={{ color: colors.tertiary400 }}
                onPress={() =>
                  navigation.navigate("AuthStack", {
                    screen: "Login",
                  })
                }
              >
                Login here
              </Text>
            </Text>
          </View>

          <Text fontSize={15} style={styles.footer_link}>
            v2.5.501
          </Text>
        </View>
      </KeyboardAwareView>
    </SafeAreaView>
  );
};

export default Register;
