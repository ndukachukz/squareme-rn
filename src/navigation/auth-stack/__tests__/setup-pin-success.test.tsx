import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import SetupPinSuccess from "../setup-pin-success";

// Mock dependencies
jest.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      background: "#FFFFFF",
      gray500: "#333333",
      success: "#00C851",
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

// Mock SuccessScreen component
jest.mock("@/components/screens/success-screen", () => {
  const { View, Text, TouchableOpacity } = require("react-native");
  return function MockSuccessScreen({
    title,
    description,
    buttonText,
    buttonProps,
    ...props
  }: any) {
    return (
      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <TouchableOpacity
          onPress={buttonProps?.onPress}
          testID={`button-${buttonText?.toLowerCase().replace(/\s/g, "-")}`}
        >
          <Text>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

const renderWithNavigation = (component: React.ReactElement) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe("SetupPinSuccess Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithNavigation(<SetupPinSuccess />);

    expect(screen.getByText("PIN Created Successfully!")).toBeTruthy();
    expect(screen.getByTestId("button-continue")).toBeTruthy();
  });

  it("handles continue button press", () => {
    renderWithNavigation(<SetupPinSuccess />);

    const continueButton = screen.getByTestId("button-continue");
    fireEvent.press(continueButton);

    expect(mockNavigate).toHaveBeenCalled();
  });
});
