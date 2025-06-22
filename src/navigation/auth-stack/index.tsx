import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
import Register from "./register";
import Onboarding from "./onboarding";
import ForgotPassword from "./forgot-password";
import VerifyPhone from "./verify-phone";
import SetupPin from "./setup-pin";

export default createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Onboarding,
    Login,
    Register,
    ForgotPassword,
    VerifyPhone,
    SetupPin,
  },
});
