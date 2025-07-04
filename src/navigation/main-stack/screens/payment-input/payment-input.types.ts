import { StaticScreenProps } from "@react-navigation/native";
import { PaymentAction } from "@/types/transactions.types";

export type PaymentInputProps = StaticScreenProps<{
  paymentAction: PaymentAction;
}>;
