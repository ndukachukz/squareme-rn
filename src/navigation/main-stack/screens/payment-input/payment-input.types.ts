import { StaticScreenProps } from "@react-navigation/native";

export type PaymentInputType = "request" | "send";

export interface PaymentInputScreenParams {
  type: PaymentInputType;
}

export type PaymentInputProps = StaticScreenProps<{
  type: PaymentInputType;
}>;
