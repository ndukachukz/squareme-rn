import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .max(16, "Phone number must not exceed 16 digits"),
  referralCode: Yup.string()
    .optional()
    .matches(
      /^[A-Za-z0-9]{6,12}$/,
      "Referral code must be 6-12 alphanumeric characters"
    ),
});

export type RegisterFormData = Yup.InferType<typeof registerValidationSchema>;
