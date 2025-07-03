import React, { useCallback, useEffect, useMemo, useRef } from "react";
import SelectBottomSheet from "@/components/ui/select-bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { SelectBottomSheetOption } from "@/components/ui/select-bottom-sheet/select-bottom-sheet.types";
import Bank from "@assets/svgs/bank.svg";
import UsersCheck from "@assets/svgs/users-check.svg";
import AtSign from "@assets/svgs/at-sign.svg";
import Plus from "@assets/svgs/plus.svg";
import { moderateScale } from "@/utils/metrics";
import { commonColors } from "@/constants/theme";
import {
  PaymentOption,
  PaymentOptionsBottomSheetProps,
} from "./payment-options-bottom-sheet.types";

const PaymentOptionsBottomSheet: React.FC<PaymentOptionsBottomSheetProps> = ({
  isVisible,
  onClose,
  type,
  onSelect,
}) => {
  const selectSheetRef = useRef<BottomSheet>(null);

  const handleSendAction = useCallback(
    (type: PaymentOption) => {
      switch (type) {
        case "bank_account":
          onSelect?.("bank_account");
          break;
        case "beneficiary":
          onSelect?.("beneficiary");
          break;
        case "tag":
          onSelect?.("tag");
          break;
        case "contact":
          onSelect?.("contact");
          break;
      }

      selectSheetRef.current?.close();
    },
    [onSelect]
  );

  const handleRequestAction = useCallback(
    (type: PaymentOption) => {
      switch (type) {
        case "beneficiary":
          onSelect?.("beneficiary");
          break;
        case "tag":
          onSelect?.("tag");
          break;
        case "contact":
          onSelect?.("contact");
          break;
      }

      selectSheetRef.current?.close();
    },
    [onSelect]
  );

  const sendOptions: SelectBottomSheetOption[] = useMemo(
    () => [
      {
        title: "Send to bank account",
        onSelect: () => handleSendAction("bank_account"),
        left: <Bank width={moderateScale(16)} height={moderateScale(16)} />,
      },
      {
        title: "Send to a beneficiary",
        onSelect: () => handleSendAction("beneficiary"),
        left: (
          <UsersCheck width={moderateScale(16)} height={moderateScale(16)} />
        ),
      },
      {
        title: "Send using Squareme tag",
        onSelect: () => handleSendAction("tag"),
        left: <AtSign width={moderateScale(16)} height={moderateScale(16)} />,
      },
      {
        title: "Send to contact list",
        onSelect: () => handleSendAction("contact"),
        left: (
          <Plus
            height={moderateScale(16)}
            width={moderateScale(16)}
            color={commonColors.secondary50}
          />
        ),
      },
    ],
    []
  );

  const requestOptions: SelectBottomSheetOption[] = useMemo(
    () => [
      {
        title: "Request from a beneficiary",
        onSelect: () => handleRequestAction("beneficiary"),
        left: (
          <UsersCheck width={moderateScale(16)} height={moderateScale(16)} />
        ),
      },
      {
        title: "Request from contact list",
        onSelect: () => handleRequestAction("contact"),
        left: (
          <Plus
            height={moderateScale(16)}
            width={moderateScale(16)}
            color={commonColors.secondary50}
          />
        ),
      },
      {
        title: "Request using Squareme tag",
        onSelect: () => handleRequestAction("tag"),
        left: <AtSign width={moderateScale(16)} height={moderateScale(16)} />,
      },
    ],
    []
  );

  const options = useMemo(
    () => ({
      send: sendOptions,
      request: requestOptions,
    }),
    [sendOptions, requestOptions]
  );

  useEffect(() => {
    if (isVisible) selectSheetRef.current?.expand();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <SelectBottomSheet
      ref={selectSheetRef}
      title={
        type === "send"
          ? "Where do you want to send money?"
          : "Who do you want to request from?"
      }
      options={options[type]}
      onClose={onClose}
    />
  );
};

export default PaymentOptionsBottomSheet;
