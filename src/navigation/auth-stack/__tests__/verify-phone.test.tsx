import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import VerifyPhone from "../verify-phone";

// Mock dependencies
jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      background: "#FFFFFF",
      gray500: "#333333",
      tertiary500: "#007AFF",
      gray400: "#666666",
    },
  }),
}));

jest.mock("@/utils/metrics", () => ({
  horizontalScale: (size: number) => size,
  verticalScale: (size: number) => size,
  convertLineHeightToPixels: (percentage: number, fontSize: number) =>
    fontSize * (percentage / 100),
}));

// Mock navigation
const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock screen header component
jest.mock("@/components/sections/screen-header", () => {
  const { View, Text, TouchableOpacity } = require("react-native");
  return function MockScreenHeader({ title, onLeftPress, ...props }: any) {
    return (
      <View>
        {onLeftPress && (
          <TouchableOpacity onPress={onLeftPress} testID="back-button">
            <Text>Back</Text>
          </TouchableOpacity>
        )}
        <Text>{title}</Text>
      </View>
    );
  };
});

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

// Mock assets
jest.mock("@/assets/svgs/arrow-left.svg", () => "ArrowLeft");

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

// Mock route prop
const mockRoute = {
  params: {
    phone: "+2348012345678",
  },
};

describe("VerifyPhone Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithNavigation(<VerifyPhone route={mockRoute} />);

    expect(screen.getByTestId("otp-input")).toBeTruthy();
    expect(screen.getByTestId("button-verify")).toBeTruthy();
  });

  it("handles verify button press", () => {
    renderWithNavigation(<VerifyPhone route={mockRoute} />);

    const verifyButton = screen.getByTestId("button-verify");
    fireEvent.press(verifyButton);

    expect(mockNavigate).toHaveBeenCalled();
  });
});
