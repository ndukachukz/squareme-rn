import { StaticScreenProps } from "@react-navigation/native";

import { PaymentAction } from "@/types/transactions.types";
import { TransactionType } from "@/types/transactions.types";

export type TransactionSuccessProps = StaticScreenProps<{
  transactionType: TransactionType;
  amount: number;
  paymentAction: PaymentAction;
}>;
