import { PaymentAction, TransactionType } from "@/types/transactions.types";

export interface PaymentOptionsBottomSheetProps {
  isVisible: boolean;
  paymentAction: PaymentAction;
  onClose?: () => void;
  onSelect?: (option: TransactionType) => void;
}
