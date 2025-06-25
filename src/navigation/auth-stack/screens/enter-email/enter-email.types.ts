import * as Yup from "yup";

export interface EnterEmailFormData {
  email: string;
}

export const enterEmailValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email address is required")
    .email("Please enter a valid email address"),
});
