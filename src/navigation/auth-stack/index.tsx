import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
import Register from "./register";
import Onboarding from "./onboarding";
import ForgotPassword from "./forgot-password";
import VerifyPhone from "./verify-phone";
import SetupPin from "./setup-pin";
import VerificationSuccess from "./verification-success";
import ConfirmPin from "./confirm-pin";
import SetupPinSuccess from "./setup-pin-success";
import SetupBVN from "./setup-bvn";
import StayInLoop from "./stay-in-loop";
import EnterEmail from "./enter-email";
import VerifyEmail from "./verify-email";
import EmailSuccess from "./email-success";

export default createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Onboarding,
    Login,
    Register,
    ForgotPassword,
    VerifyPhone,
    VerificationSuccess,
    SetupPin,
    ConfirmPin,
    SetupPinSuccess,
    SetupBVN,
    StayInLoop,
    EnterEmail,
    VerifyEmail,
    EmailSuccess,
  },
});
