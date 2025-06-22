import { Home } from "@/navigation/screens/home";
import { Updates } from "@/navigation/screens/updates";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Feed",
      },
    },
    Updates: {
      screen: Updates,
      options: {
        title: "Updates",
      },
    },
  },
});
