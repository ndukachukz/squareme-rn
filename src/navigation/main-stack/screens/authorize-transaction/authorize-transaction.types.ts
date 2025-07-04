import { TransactionType } from "@/types/transactions.types";
import { PaymentAction } from "@/types/transactions.types";
import { StaticScreenProps } from "@react-navigation/native";

export type AuthorizeTransactionProps = StaticScreenProps<{
  transactionType: TransactionType;
  amount: number;
  paymentAction: PaymentAction;
}>;
