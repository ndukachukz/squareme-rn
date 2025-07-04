import * as Yup from "yup";

// Validation schemas
export const sendValidationSchema = Yup.object().shape({
  squaremeTag: Yup.string()
    .required("Squareme Tag is required")
    .min(3, "Squareme Tag must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Squareme Tag can only contain letters, numbers, and underscores"
    ),
  purpose: Yup.string().max(100, "Purpose must be less than 100 characters"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
});

export const requestValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  recipientTag: Yup.string()
    .required("Recipient Squareme Tag is required")
    .min(3, "Squareme Tag must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Squareme Tag can only contain letters, numbers, and underscores"
    ),
  note: Yup.string().max(200, "Note must be less than 200 characters"),
});
