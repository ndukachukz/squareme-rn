import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../login";

// Mock dependencies
jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      background: "#FFFFFF",
      gray500: "#333333",
      tertiary500: "#007AFF",
      inputContainer: "#F5F5F5",
    },
  }),
}));

jest.mock("@/utils/metrics", () => ({
  horizontalScale: (size: number) => size,
  verticalScale: (size: number) => size,
}));

// Mock navigation
const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock components
jest.mock("@/components/ui/text", () => {
  const { Text } = require("react-native");
  return function MockText(props: any) {
    return <Text {...props}>{props.children}</Text>;
  };
});

jest.mock("@/components/ui/button", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return function MockButton({ title, onPress, ...props }: any) {
    return (
      <TouchableOpacity
        onPress={onPress}
        testID={`button-${title?.toLowerCase().replace(/\s/g, "-")}`}
        {...props}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});

jest.mock("@/components/ui/otp-input", () => {
  const { TextInput } = require("react-native");
  return function MockOTPInput({ value, onChange, testID, ...props }: any) {
    return (
      <TextInput
        value={value}
        onChangeText={onChange}
        testID={testID || "otp-input"}
        {...props}
      />
    );
  };
});

// Mock react-native-paper Icon to avoid icon errors
jest.mock("react-native-paper", () => ({
  Icon: ({ source, ...props }: any) => {
    const { View } = require("react-native");
    return <View testID="icon" {...props} />;
  },
}));

// Mock assets
jest.mock("@/assets/imgs/logo.png", () => "logo");
jest.mock("@/assets/svgs/help-circel.svg", () => "HelpCircle");
jest.mock("@/assets/svgs/fingerprint.svg", () => "FingerprintIcon");

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe("Login Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithNavigation(<Login />);

    expect(screen.getByText("Welcome back John")).toBeTruthy();
    expect(screen.getByTestId("otp-input")).toBeTruthy();
    expect(screen.getByTestId("button-log-in")).toBeTruthy();
  });

  it("handles PIN input", () => {
    renderWithNavigation(<Login />);

    const otpInput = screen.getByTestId("otp-input");
    fireEvent.changeText(otpInput, "123456");

    expect(otpInput.props.value).toBe("123456");
  });

  it("handles login button press", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    renderWithNavigation(<Login />);

    const loginButton = screen.getByTestId("button-log-in");
    fireEvent.press(loginButton);

    expect(consoleSpy).toHaveBeenCalledWith("Login button pressed");

    consoleSpy.mockRestore();
  });

  it("shows app version", () => {
    renderWithNavigation(<Login />);

    expect(screen.getByText("v2.5.501")).toBeTruthy();
  });
});
