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
