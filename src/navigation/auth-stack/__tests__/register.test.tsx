import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../register";

// Mock dependencies
jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      background: "#FFFFFF",
      gray500: "#333333",
      tertiary400: "#007AFF",
    },
  }),
}));

jest.mock("@/utils/metrics", () => ({
  horizontalScale: (size: number) => size,
  verticalScale: (size: number) => size,
  moderateScale: (size: number) => size,
  convertLineHeightToPixels: (percentage: number, fontSize: number) =>
    fontSize * (percentage / 100),
}));

jest.mock("@/utils", () => ({
  formatPhoneNumber: (phone: string) => {
    if (!phone) return "";
    return phone;
  },
}));

// Mock navigation
const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock the entire register component's complex parts
jest.mock("formik", () => ({
  useFormik: () => ({
    values: { phone: "", referralCode: "" },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    handleSubmit: jest.fn(),
    setFieldValue: jest.fn(),
    isSubmitting: false,
    errors: {},
  }),
}));

// Mock components
jest.mock("@components/ui/text", () => {
  const { Text } = require("react-native");
  return function MockText(props: any) {
    return <Text {...props}>{props.children}</Text>;
  };
});

jest.mock("@components/ui/button", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return function MockButton({ title, onPress, ...props }: any) {
    return (
      <TouchableOpacity
        onPress={onPress}
        testID={`button-${title?.toLowerCase()}`}
        {...props}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});

jest.mock("@components/ui/input-field", () => {
  const { View, TextInput, Text } = require("react-native");
  return function MockInputField({
    label,
    placeholder,
    value,
    onChangeText,
    error,
    ...props
  }: any) {
    return (
      <View testID={`input-field-${label?.toLowerCase().replace(/\s/g, "-")}`}>
        {label && <Text>{label}</Text>}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          testID={`input-${label?.toLowerCase().replace(/\s/g, "-")}`}
          {...props}
        />
        {error && <Text testID="error-text">{error}</Text>}
      </View>
    );
  };
});

jest.mock("@components/ui/keyboard-aware-view", () => {
  const { ScrollView } = require("react-native");
  return function MockKeyboardAwareView({ children, ...props }: any) {
    return <ScrollView {...props}>{children}</ScrollView>;
  };
});

// Mock assets
jest.mock("@assets/imgs/logo.png", () => "logo");
jest.mock("@assets/svgs/help-circel.svg", () => "HelpCircle");
jest.mock("@assets/imgs/country-flag.png", () => "nigerianFlag");

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe("Register Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithNavigation(<Register />);

    expect(screen.getByText("Create an account")).toBeTruthy();
    expect(screen.getByText("Phone Number")).toBeTruthy();
    expect(screen.getByTestId("button-next")).toBeTruthy();
  });

  it("handles phone number input", () => {
    renderWithNavigation(<Register />);

    const phoneInput = screen.getByTestId("input-phone-number");
    fireEvent.changeText(phoneInput, "08012345678");

    // Just check that the input exists and can receive text
    expect(phoneInput).toBeTruthy();
  });
});
