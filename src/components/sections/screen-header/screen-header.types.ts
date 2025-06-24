import { StyleProp, ViewStyle } from "react-native";

// import {React} from
export interface ScreenHeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
}
