import { AppBottomSheetProps } from "../app-bottom-sheet/app-bottom-sheet.types";

export interface SelectBottomSheetOption {
  title: string;
  onSelect: () => void;
  right?: React.ReactNode;
  left?: React.ReactNode;
}

export interface SelectBottomSheetProps
  extends OmitChildren<AppBottomSheetProps> {
  title: string;
  options: SelectBottomSheetOption[];
}
