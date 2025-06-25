import { ScreenHeaderProps } from "../screen-header/screen-header.types";

export interface ScreenHeaderWithBackProps
  extends Omit<ScreenHeaderProps, "headerLeft"> {
  /**
   * Custom onBack handler. If not provided, uses navigation.goBack()
   */
  onBack?: () => void;
  /**
   * Custom back button component. If provided, overrides the default ArrowLeft icon
   */
  customBackButton?: React.ReactNode;
}
