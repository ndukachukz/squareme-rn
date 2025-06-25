import React from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import Text from "@/components/ui/text";
import InputField from "@/components/ui/input-field";
import Button from "@/components/ui/button";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import KeyboardAwareView from "@/components/ui/keyboard-aware-view";
import { convertLineHeightToPixels } from "@/utils/metrics";
import { useFormik } from "formik";
import {
  EnterEmailFormData,
  enterEmailValidationSchema,
} from "./enter-email.types";
import styles from "./enter-email.styles";

const EnterEmail: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const formik = useFormik<EnterEmailFormData>({
    initialValues: {
      email: "",
    },
    validationSchema: enterEmailValidationSchema,
    onSubmit(data) {
      navigation.navigate("AuthStack", {
        screen: "VerifyEmail",
        params: {
          email: data.email,
        },
      });
    },
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScreenHeaderWithBack title="Enter your email address" />

      <KeyboardAwareView contentContainerStyle={styles.content}>
        <View style={styles.formSection}>
          <Text
            fontSize={15}
            style={[
              styles.description,
              { lineHeight: convertLineHeightToPixels(145, 15) },
            ]}
          >
            Please enter your email address
          </Text>

          <InputField
            label="Email address"
            placeholder=""
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            error={formik.errors.email ?? undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={formik.handleSubmit}
            disabled={!formik.isValid || !formik.values.email}
          />
        </View>
      </KeyboardAwareView>
    </SafeAreaView>
  );
};

export default EnterEmail;
