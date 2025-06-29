import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./tab-navigator";
import { Settings } from "./screens/settings";
import Transactions from "./screens/transactions";
import TransactionDetails from "./screens/transaction-details";
import Notifications from "./screens/notifications";
import PaymentInput from "./screens/payment-input";

export default createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    HomeTabs: TabsNavigator,
    Settings,
    TransactionDetails,
    Transactions,
    Notifications,
    PaymentInput,
  },
});
