import { PaymentInputType } from "../../payment-input.types";

export type PaymentOption = "bank_account" | "beneficiary" | "tag" | "contact";

export interface PaymentOptionsBottomSheetProps {
  isVisible: boolean;
  type: PaymentInputType;
  onClose?: () => void;
  onSelect?: (option: PaymentOption) => void;
}
