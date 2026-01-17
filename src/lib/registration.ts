import { siteConfig } from "@/config/site";

export function getRegistrationCloseDate() {
  return new Date(siteConfig.registrationDeadline);
}

export function isRegistrationClosed(now: Date = new Date()) {
  return now.getTime() > getRegistrationCloseDate().getTime();
}
