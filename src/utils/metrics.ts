import { guidelineBaseHeight, guidelineBaseWidth } from "@/constants";

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

// Convert percentage line-height to pixels
export const convertLineHeightToPixels = (
  percentage: number,
  fontSize: number
) => {
  return (percentage / 100) * moderateScale(fontSize);
};

// Convert percentage string (e.g., "145%") to pixels
export const convertLineHeightStringToPixels = (
  percentageString: string,
  fontSize: number
) => {
  const percentage = parseFloat(percentageString.replace("%", ""));
  return (percentage / 100) * moderateScale(fontSize);
};

export { horizontalScale, verticalScale, moderateScale };
