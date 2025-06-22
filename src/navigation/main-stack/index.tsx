import { HeaderButton } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./tab-navigator";
import { Profile } from "../screens/profile";
import { Settings } from "../screens/settings";
import Text from "@/components/ui/text";

export default createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    HomeTabs: {
      screen: TabsNavigator,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
  },
});
