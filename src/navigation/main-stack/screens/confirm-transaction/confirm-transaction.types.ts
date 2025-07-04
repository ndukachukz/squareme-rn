import { StaticScreenProps } from "@react-navigation/native";
import { PaymentAction, TransactionType } from "@/types/transactions.types";

export type ConfirmTransactionProps = StaticScreenProps<{
  transactionType: TransactionType;
  amount: number;
  paymentAction: PaymentAction;
}>;
