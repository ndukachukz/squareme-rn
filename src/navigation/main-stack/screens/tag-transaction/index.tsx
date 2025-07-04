import { View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { TransactionScreenParams } from "@/types/transactions.types";
import ScreenWrapper from "@/components/ui/screen-wrapper";
import ScreenHeaderWithBack from "@/components/sections/screen-header-with-back";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import Text from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import { useFormik } from "formik";
import { requestValidationSchema } from "./tag-transaction.types";
import { sendValidationSchema } from "./tag-transaction.types";
import styles from "./tag-transaction.styles";

const TagTransaction: React.FC<TransactionScreenParams> = ({ route }) => {
  const { paymentAction, amount } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme();

  const validationSchema = useMemo(() => {
    return paymentAction === "send"
      ? sendValidationSchema
      : requestValidationSchema;
  }, [paymentAction]);

  const initialValues = useMemo(() => {
    if (paymentAction === "send") {
      return {
        squaremeTag: "",
        purpose: "",
        amount: amount,
      };
    } else {
      return {
        amount: amount,
        recipientTag: "",
        note: "",
      };
    }
  }, [paymentAction, amount]);

  const handleSubmit = useCallback(
    (values: any) => {
      navigation.navigate("MainStack", {
        screen: "ConfirmTransaction",
        params: { paymentAction, amount: values.amount, ...values },
      });
    },
    [paymentAction, navigation]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <View>
        <ScreenHeaderWithBack
          title={
            paymentAction === "send" ? "Send" : "Request using Squareme Tag"
          }
        />

        <View style={styles.form_container}>
          {paymentAction === "send" ? (
            <>
              <InputField
                label="Enter Squareme Tag"
                value={formik.values.squaremeTag}
                onChangeText={formik.handleChange("squaremeTag")}
                onBlur={formik.handleBlur("squaremeTag")}
                error={formik.errors.squaremeTag ?? undefined}
                placeholder="Enter recipient's Squareme Tag"
              />
              <InputField
                label="Purpose for sending(optional)"
                value={formik.values.purpose}
                onChangeText={formik.handleChange("purpose")}
                onBlur={formik.handleBlur("purpose")}
                error={formik.errors.purpose ?? undefined}
                placeholder="Add purpose for transaction"
              />
              <InputField
                label="Amount"
                value={formik.values.amount.toString()}
                editable={false}
                leftComponent={
                  <Text color={colors.gray300} fontSize={15}>
                    ₦
                  </Text>
                }
              />
            </>
          ) : (
            <>
              <InputField
                inputContainerStyle={{ columnGap: 2 }}
                leftComponent={
                  <Text color={colors.gray300} fontSize={15}>
                    ₦
                  </Text>
                }
                label="Amount"
                value={formik.values.amount.toString()}
                editable={false}
              />

              <InputField
                inputContainerStyle={{ columnGap: 2 }}
                leftComponent={<Text color={colors.gray300}>@</Text>}
                label="Enter recipient Squareme Tag"
                value={formik.values.recipientTag}
                onChangeText={formik.handleChange("recipientTag")}
                onBlur={formik.handleBlur("recipientTag")}
                error={formik.errors.recipientTag ?? undefined}
                placeholder="Enter recipient's Squareme Tag"
              />
              <InputField
                textArea
                label="Add a note(optional)"
                value={formik.values.note}
                onChangeText={formik.handleChange("note")}
                onBlur={formik.handleBlur("note")}
                error={formik.errors.note ?? undefined}
                placeholder="Add a note for your request"
              />
            </>
          )}
        </View>
      </View>

      <Button
        title={paymentAction === "send" ? "Send Money" : "Request Money"}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid || formik.isSubmitting}
      />
    </ScreenWrapper>
  );
};

export default TagTransaction;
