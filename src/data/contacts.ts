import type { MetrikaGoal } from "@/lib/ym";

export const contactItems = [
  {
    label: "VK СОГУ",
    value: "vk.com/soguinfo",
    href: "https://vk.com/soguinfo",
    goal: "click_vk_sogu",
    icon: "vk",
  },
  {
    label: "VK Профком СОГУ",
    value: "vk.com/profcomsogu",
    href: "https://vk.com/profcomsogu",
    goal: "click_vk_profkom",
    icon: "vk",
  },
  {
    label: "Telegram",
    value: "t.me/prof4love",
    href: "https://t.me/prof4love",
    goal: "click_tg",
    icon: "telegram",
  },
  {
    label: "Instagram",
    value: "instagram.com/profcomsogu",
    href: "https://instagram.com/profcomsogu",
    goal: "click_instagram",
    icon: "instagram",
  },
] satisfies {
  label: string;
  value: string;
  href: string;
  goal: MetrikaGoal;
  icon: string;
}[];

export const organizationContacts = [
  {
    name: "СОГУ",
    description: "Северо-Осетинский государственный университет",
    logo: "/images/logo-sogu.png",
    socials: [
      {
        label: "VK",
        href: "https://vk.com/soguinfo",
        icon: "vk",
        goal: "click_vk_sogu",
      },
      {
        label: "Telegram",
        href: "https://t.me/sogu_news",
        icon: "telegram",
        goal: "click_tg_sogu",
      },
    ],
  },
  {
    name: "Профком студентов СОГУ",
    description: "Первичная профсоюзная организация студентов СОГУ",
    logo: "/images/logo-profkom.png",
    socials: [
      {
        label: "VK",
        href: "https://vk.com/profcomsogu",
        icon: "vk",
        goal: "click_vk_profkom",
      },
      {
        label: "Telegram",
        href: "https://t.me/prof4love",
        icon: "telegram",
        goal: "click_tg",
      },
      {
        label: "Instagram",
        href: "https://instagram.com/profcomsogu",
        icon: "instagram",
        goal: "click_instagram",
      },
    ],
  },
  {
    name: "Record Media",
    description: "Студенческий медиацентр",
    logo: "/images/logo-record.png",
    socials: [
      {
        label: "VK",
        href: "https://vk.com/record_sogu",
        icon: "vk",
        goal: "click_vk_record",
      },
      {
        label: "Telegram",
        href: "https://t.me/record_nosu",
        icon: "telegram",
        goal: "click_tg_record",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/record_sogu",
        icon: "instagram",
        goal: "click_inst_record",
      },
    ],
  },
];
