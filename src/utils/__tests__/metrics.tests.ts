import { horizontalScale, verticalScale, moderateScale } from "../metrics";

// Mock React Native Dimensions
jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn(() => ({
      width: 375,
      height: 812,
    })),
  },
}));

// Mock constants
jest.mock("@/constants", () => ({
  guidelineBaseWidth: 350,
  guidelineBaseHeight: 680,
}));

describe("Metrics Utils", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe("horizontalScale", () => {
    it("should scale horizontally based on screen width", () => {
      const result = horizontalScale(100);
      // Expected: (375 / 350) * 100 = 107.14...
      expect(result).toBeCloseTo(107.14, 2);
    });

    it("should return 0 when input is 0", () => {
      const result = horizontalScale(0);
      expect(result).toBe(0);
    });

    it("should handle negative values", () => {
      const result = horizontalScale(-50);
      // Expected: (375 / 350) * -50 = -53.57...
      expect(result).toBeCloseTo(-53.57, 2);
    });

    it("should handle decimal values", () => {
      const result = horizontalScale(10.5);
      // Expected: (375 / 350) * 10.5 = 11.25
      expect(result).toBeCloseTo(11.25, 2);
    });
  });

  describe("verticalScale", () => {
    it("should scale vertically based on screen height", () => {
      const result = verticalScale(100);
      // Expected: (812 / 680) * 100 = 119.41...
      expect(result).toBeCloseTo(119.41, 2);
    });

    it("should return 0 when input is 0", () => {
      const result = verticalScale(0);
      expect(result).toBe(0);
    });

    it("should handle negative values", () => {
      const result = verticalScale(-30);
      // Expected: (812 / 680) * -30 = -35.82...
      expect(result).toBeCloseTo(-35.82, 2);
    });

    it("should handle decimal values", () => {
      const result = verticalScale(15.5);
      // Expected: (812 / 680) * 15.5 = 18.51...
      expect(result).toBeCloseTo(18.51, 2);
    });
  });

  describe("moderateScale", () => {
    it("should apply moderate scaling with default factor (0.5)", () => {
      const size = 100;
      const horizontalScaled = (375 / 350) * size; // 107.14...
      const expected = size + (horizontalScaled - size) * 0.5; // 100 + (107.14 - 100) * 0.5 = 103.57...

      const result = moderateScale(size);
      expect(result).toBeCloseTo(103.57, 2);
    });

    it("should apply moderate scaling with custom factor", () => {
      const size = 100;
      const factor = 0.25;
      const horizontalScaled = (375 / 350) * size; // 107.14...
      const expected = size + (horizontalScaled - size) * factor; // 100 + (107.14 - 100) * 0.25 = 101.785...

      const result = moderateScale(size, factor);
      expect(result).toBeCloseTo(101.79, 2);
    });

    it("should return original size when factor is 0", () => {
      const size = 100;
      const result = moderateScale(size, 0);
      expect(result).toBe(size);
    });

    it("should return horizontalScale result when factor is 1", () => {
      const size = 100;
      const result = moderateScale(size, 1);
      const horizontalResult = horizontalScale(size);
      expect(result).toBeCloseTo(horizontalResult, 2);
    });

    it("should handle negative factor", () => {
      const size = 100;
      const factor = -0.5;
      const horizontalScaled = (375 / 350) * size;
      const expected = size + (horizontalScaled - size) * factor;

      const result = moderateScale(size, factor);
      expect(result).toBeCloseTo(expected, 2);
    });

    it("should return 0 when input size is 0", () => {
      const result = moderateScale(0);
      expect(result).toBe(0);
    });
  });

  describe("Integration with different screen dimensions", () => {
    it("should handle different screen sizes", () => {
      // Note: Since metrics.ts captures dimensions at import time,
      // we test with the default mocked dimensions (375x812)
      const horizontalResult = horizontalScale(100);
      const verticalResult = verticalScale(100);

      // Expected with default mock (375x812): (375 / 350) * 100 = 107.14...
      expect(horizontalResult).toBeCloseTo(107.14, 2);
      // Expected with default mock (375x812): (812 / 680) * 100 = 119.41...
      expect(verticalResult).toBeCloseTo(119.41, 2);
    });

    it("should work with the mocked screen dimensions", () => {
      // Test that our functions work with the current mocked dimensions
      const horizontalResult = horizontalScale(50);
      const verticalResult = verticalScale(50);

      // Expected: (375 / 350) * 50 = 53.57...
      expect(horizontalResult).toBeCloseTo(53.57, 2);
      // Expected: (812 / 680) * 50 = 59.71...
      expect(verticalResult).toBeCloseTo(59.71, 2);
    });
  });

  describe("Edge cases", () => {
    it("should handle very large numbers", () => {
      const largeNumber = 1000000;
      const result = horizontalScale(largeNumber);
      expect(result).toBeCloseTo((375 / 350) * largeNumber, 2);
    });

    it("should handle very small decimal numbers", () => {
      const smallNumber = 0.001;
      const result = verticalScale(smallNumber);
      expect(result).toBeCloseTo((812 / 680) * smallNumber, 6);
    });
  });
});
