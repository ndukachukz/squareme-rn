import { InfoScreenProps } from "../info-screen/info-screen.types";

export interface SuccessScreenProps extends Omit<InfoScreenProps, "infoImage"> {
  infoImage?: InfoScreenProps["infoImage"];
}
