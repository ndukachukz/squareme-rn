import { StaticScreenProps } from "@react-navigation/native";

export type PaymentAction = "request" | "send";

export type TransactionType =
  | "bank_account"
  | "beneficiary"
  | "tag"
  | "contact";

export type TransactionScreenParams = StaticScreenProps<{
  paymentAction: PaymentAction;
  amount: number;
}>;

export interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
}
