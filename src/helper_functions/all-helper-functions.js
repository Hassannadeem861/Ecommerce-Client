// Format salary in PKR
export const formatPKRS = (salary) => {
  if (!salary && salary !== 0) return "Rs. 0";
  return `Rs. ${Number(salary).toLocaleString("en-PK")}`;
};

// Format mobile number
export const formatMobileNumber = (number) => {
  if (!number) return "N/A";
  const cleaned = number.replace(/\D/g, "");

  if (cleaned.length === 11 && cleaned.startsWith("03")) {
    return cleaned.replace(/(\d{4})(\d{7})/, "0$1-$2");
  }

  if (cleaned.length === 12 && cleaned.startsWith("923")) {
    return cleaned.replace(/92(\d{3})(\d{7})/, "+92 $1-$2");
  }

  return number;
};

// Format date as "01-Aug-2024"
export const formatDateOnly = (isoDateString) => {
  if (!isoDateString) return "N/A";
  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
