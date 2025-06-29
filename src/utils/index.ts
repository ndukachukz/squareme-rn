import { Transaction } from "@/types/transactions.types";
import * as Clipboard from "expo-clipboard";

export const formatPhoneNumber = (text: string) => {
  // Remove all non-digit characters except +
  const cleaned = text.replace(/[^\d+]/g, "");

  // If input is empty or just +, return +234
  if (cleaned.length === 0 || cleaned === "+") {
    return "+234";
  }

  // Extract digits after country code
  let digits = "";
  if (cleaned.startsWith("+234")) {
    digits = cleaned.slice(4); // Get digits after +234
  } else if (cleaned.startsWith("234")) {
    digits = cleaned.slice(3); // Get digits after 234
  } else if (cleaned.startsWith("+")) {
    digits = cleaned.slice(1); // Get digits after +
  } else {
    // Remove leading 0 if present and use all digits
    digits = cleaned.replace(/^0/, "");
  }

  // Limit to exactly 10 digits (Nigerian phone number standard)
  digits = digits.slice(0, 10);

  // Build the formatted number
  let formatted = "+234";

  if (digits.length > 0) {
    // Add spaces for readability: +234 XXX XXX XXXX
    if (digits.length <= 3) {
      formatted = "+234 " + digits;
    } else if (digits.length <= 6) {
      formatted = "+234 " + digits.slice(0, 3) + " " + digits.slice(3);
    } else {
      formatted =
        "+234 " +
        digits.slice(0, 3) +
        " " +
        digits.slice(3, 6) +
        " " +
        digits.slice(6);
    }
  }

  return formatted;
};

export const handleCopy = async (text: string): Promise<boolean> => {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    return false;
  }
};

export const getStatus = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return "Successful";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    default:
      return "Failed";
  }
};

export const formatAmount = (amount: number) => {
  const sign = amount >= 0 ? "+" : "";
  return `${sign}NGN ${Math.abs(amount).toFixed(2)}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

// Simple HTML parser for basic tags
export const parseHtmlToTextSegments = (html: string) => {
  const segments: Array<{ text: string; bold?: boolean }> = [];

  const regex = /<b>(.*?)<\/b>|<strong>(.*?)<\/strong>|([^<]+)/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    if (match[1] !== undefined) {
      // <b> tag content
      segments.push({ text: match[1], bold: true });
    } else if (match[2] !== undefined) {
      // <strong> tag content
      segments.push({ text: match[2], bold: true });
    } else if (match[3] !== undefined) {
      // Regular text
      segments.push({ text: match[3] });
    }
  }

  return segments;
};
