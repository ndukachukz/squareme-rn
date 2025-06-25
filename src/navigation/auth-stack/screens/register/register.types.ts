import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .test(
      "phone-validation",
      "Please enter a valid phone number",
      function (value) {
        if (!value) return false;

        // Remove spaces and check if it matches international phone format
        const cleanedPhone = value.replace(/\s/g, "");

        // International phone number regex: starts with + followed by country code (1-4 digits) and phone number (4-15 digits)
        const internationalPhoneRegex = /^\+[1-9]\d{0,3}\d{4,15}$/;

        return (
          internationalPhoneRegex.test(cleanedPhone) &&
          cleanedPhone.length >= 8 &&
          cleanedPhone.length <= 20
        );
      }
    ),
  referralCode: Yup.string()
    .optional()
    .matches(
      /^[A-Za-z0-9]{6,12}$/,
      "Referral code must be 6-12 alphanumeric characters"
    ),
});

export type RegisterFormData = Yup.InferType<typeof registerValidationSchema>;
