import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./tab-navigator";
import { Settings } from "./screens/settings";
import Transactions from "./screens/transactions";
import TransactionDetails from "./screens/transaction-details";
import Notifications from "./screens/notifications";
import PaymentInput from "./screens/payment-input";
import TagTransaction from "./screens/tag-transaction";
import ContactTransaction from "./screens/contact-transaction";
import SelectBeneficiary from "./screens/select-beneficiary";
import BankAccountTransaction from "./screens/bank-transaction";
import ConfirmTransaction from "./screens/confirm-transaction";
import AuthorizeTransaction from "./screens/authorize-transaction";
import TransactionSuccess from "./screens/transaction-success";

export default createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    HomeTabs: TabsNavigator,
    Settings,
    TransactionDetails,
    Transactions,
    Notifications,
    PaymentInput,
    TagTransaction,
    ContactTransaction,
    SelectBeneficiary,
    BankAccountTransaction,
    AuthorizeTransaction,
    ConfirmTransaction,
    TransactionSuccess,
  },
});
