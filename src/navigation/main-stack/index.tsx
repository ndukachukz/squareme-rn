import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./tab-navigator";
import { Settings } from "../screens/settings";

export default createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    HomeTabs: TabsNavigator,
    Settings,
  },
});
