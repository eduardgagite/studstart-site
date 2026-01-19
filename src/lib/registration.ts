import { siteConfig } from "@/config/site";

export function getRegistrationCloseDate() {
  return new Date(siteConfig.registrationDeadline);
}

export function isRegistrationClosed(now: Date = new Date()) {
  return now.getTime() > getRegistrationCloseDate().getTime();
}

export function formatPhoneNumber(value: string): string {
  // Only allow digits
  const digits = value.replace(/\D/g, "");
  
  // Handle empty
  if (!digits) return "";

  // If starts with 8, replace with 7
  let clean = digits;
  if (clean.startsWith("8")) {
    clean = "7" + clean.slice(1);
  }
  
  // If first digit is 9, prepend 7
  if (clean.startsWith("9")) {
    clean = "7" + clean;
  }
  
  // Limit to 11 digits
  clean = clean.slice(0, 11);

  // Format
  let result = "";
  if (clean.length > 0) result += "+" + clean.substring(0, 1);
  if (clean.length > 1) result += " (" + clean.substring(1, 4);
  if (clean.length > 4) result += ") " + clean.substring(4, 7);
  if (clean.length > 7) result += "-" + clean.substring(7, 9);
  if (clean.length > 9) result += "-" + clean.substring(9, 11);

  return result;
}

export function formatTelegram(value: string): string {
  // Remove whitespace
  let clean = value.trim();
  
  // Handle t.me links
  const linkMatch = clean.match(/(?:t\.me\/|telegram\.me\/)([\w\d_]+)/i);
  if (linkMatch) {
    clean = linkMatch[1];
  }
  
  // Remove existing @ from start
  clean = clean.replace(/^@+/, "");
  
  if (!clean) return "";
  
  return "@" + clean;
}
