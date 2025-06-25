import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Register from "./screens/register";
import Onboarding from "./screens/onboarding";
import ForgotPassword from "./screens/forgot-password";
import VerifyPhone from "./screens/verify-phone";
import SetupPin from "./screens/setup-pin";
import VerificationSuccess from "./screens/verification-success";
import ConfirmPin from "./screens/confirm-pin";
import SetupPinSuccess from "./screens/setup-pin-success";
import SetupBVN from "./screens/setup-bvn";
import StayInLoop from "./screens/stay-in-loop";
import EnterEmail from "./screens/enter-email";
import VerifyEmail from "./screens/verify-email";
import EmailSuccess from "./screens/email-success";

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
