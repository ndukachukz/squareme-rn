import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home2,
  Moneys,
  MoreSquare,
  Profile as ProfileIcon,
} from "iconsax-react-nativejs";
import TabBar from "./components/tab-bar";
import Payments from "../screens/payments";
import Profile from "../screens/profile";
import More from "../screens/more";
import Home from "../screens/home";

export default createBottomTabNavigator({
  screenOptions: { headerShown: false },
  tabBar: (props) => <TabBar {...props} />,
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Home",
        tabBarIcon: (props) => (
          <Home2
            size={props.size}
            color={props.color}
            variant={props.focused ? "Bold" : "Linear"}
            opacity={props.focused ? 0.4 : undefined}
          />
        ),
      },
    },
    Payments: {
      screen: Payments,
      options: {
        title: "Payments",
        tabBarIcon: (props) => (
          <Moneys
            size={props.size}
            color={props.color}
            variant={props.focused ? "Bold" : "Linear"}
            opacity={props.focused ? 0.4 : undefined}
          />
        ),
      },
    },
    More: {
      screen: More,
      options: {
        presentation: "modal",
        title: "More",
        tabBarIcon: (props) => (
          <MoreSquare
            size={props.size}
            color={props.color}
            variant={props.focused ? "Bold" : "Linear"}
            opacity={props.focused ? 0.4 : undefined}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        title: "Profile",
        tabBarIcon: (props) => (
          <ProfileIcon
            size={props.size}
            color={props.color}
            variant={props.focused ? "Bold" : "Linear"}
            opacity={props.focused ? 0.4 : undefined}
          />
        ),
      },
    },
  },
});
