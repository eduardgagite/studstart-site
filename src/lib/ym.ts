export type MetrikaGoal =
  | "cta_register"
  | "visit_register"
  | "form_start"
  | "form_validation_error"
  | "form_confirm_step"
  | "form_success"
  | "visit_thanks"
  | "click_vk"
  | "click_tg"
  | "click_instagram"
  | "click_phone"
  | "click_email"
  | "download_program"
  | "open_vk_album"
  | "open_vk_album_photo"
  | "subscribe_news"
  | "scroll_about"
  | "scroll_howto"
  | "scroll_photos";

const ymId = process.env.NEXT_PUBLIC_YM_ID;

export function reachGoal(goal: MetrikaGoal, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !ymId) return;
  if (typeof window.ym !== "function") return;
  window.ym(ymId, "reachGoal", goal, params);
}

declare global {
  interface Window {
    ym?: (id: string, action: string, goal: string, params?: Record<string, unknown>) => void;
  }
}
