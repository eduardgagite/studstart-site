import path from "node:path";
import { readdirSync } from "node:fs";

export const heroContent = {
  title: "СтудСтарт",
  subtitle:
    "Форум успешно прошёл 8–12 февраля 2026, Порог неба, Северная Осетия.",
  description:
    "Спасибо всем участникам. Смотри, как это было: фото, истории и ключевые моменты форума.",
  primaryCta: "Как это было",
  secondaryCta: "Контакты штаба",
};

export const benefits = [
  "Провести каникулы весело и с пользой",
  "Начать интересную студенческую жизнь",
  "Новые друзья и много знакомств",
  "Прикольные мероприятия и командные игры",
];

export const features = [
  {
    title: "Выездной формат",
    description:
      "Чистый воздух, горы и перезагрузка от учебных будней. Максимум энергии и впечатлений.",
  },
  {
    title: "Порог неба",
    description:
      "Одна из самых красивых локаций Северной Осетии — атмосферно и по-настоящему.",
  },
  {
    title: "Командные активности",
    description:
      "Квесты, спортивные игры, вечерние форматы — выстраиваем команду на старте.",
  },
  {
    title: "Спикеры и кураторы",
    description:
      "Наставники и эксперты рядом, чтобы подсказать и вдохновить на твой путь.",
  },
];

export const participationSteps = [
  "Форум завершён 12 февраля 2026",
  "Смотри программу и материалы",
  "Делись впечатлениями с командой",
  "Следи за анонсами следующего набора",
];

export type HomePhoto = {
  id: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};

export type HomePhotoAlbum = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  vkUrl?: string;
  photos: HomePhoto[];
};

const GALLERY_ROOT_DIR = path.join(process.cwd(), "public", "images", "gallery");
const IMAGE_FILE_PATTERN = /\.(png|jpe?g|webp|avif)$/i;
const FALLBACK_WIDTH = 1920;
const FALLBACK_HEIGHT = 1080;

const albumConfigs: Array<Omit<HomePhotoAlbum, "photos">> = [
  {
    id: "2026",
    year: "2026",
    title: "СтудСтарт",
    subtitle: "",
    vkUrl: "https://vk.ru/album-210657216_311570594",
  },
  {
    id: "2025",
    year: "2025",
    title: "Зимняя школа актива",
    subtitle: "",
    vkUrl: "https://vk.ru/album-210657216_307649375",
  },
  {
    id: "2024",
    year: "2024",
    title: "Первый шаг",
    subtitle: "",
    vkUrl: "https://vk.ru/album-210657216_301068246",
  },
];

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function buildAlbumPhotos(year: string): HomePhoto[] {
  const yearDir = path.join(GALLERY_ROOT_DIR, year);

  try {
    const filenames = readdirSync(yearDir)
      .filter((name) => !name.startsWith("."))
      .filter((name) => IMAGE_FILE_PATTERN.test(name))
      .sort((a, b) => a.localeCompare(b, "ru"));

    return shuffleArray(filenames).map((filename, index) => {
      const id = filename.replace(/\.[^.]+$/u, "");
      const number = String(index + 1).padStart(2, "0");

      return {
        id: `${year}-${id}`,
        alt: `СтудСтарт ${year}: фото ${number}`,
        src: `/images/gallery/${year}/${filename}`,
        width: FALLBACK_WIDTH,
        height: FALLBACK_HEIGHT,
      };
    });
  } catch {
    return [];
  }
}

export function getRandomPhotoAlbumsByYear(): HomePhotoAlbum[] {
  return albumConfigs.map((album) => ({
    ...album,
    photos: buildAlbumPhotos(album.year),
  }));
}

export const photoAlbumsByYear: HomePhotoAlbum[] = getRandomPhotoAlbumsByYear();
export const photoGrid = photoAlbumsByYear.flatMap((album) => album.photos);
export const vkAlbumUrl = "https://vk.ru/album-210657216_307649375";

export const organizers = [
  {
    name: "СОГУ",
    description: "Северо-Осетинский государственный университет",
    logo: "/images/branding/logos/logo-sogu.png",
  },
  {
    name: "Профком СОГУ",
    description: "Первичная профсоюзная организация СОГУ",
    logo: "/images/branding/logos/logo-profkom.png",
  },
  {
    name: "Record Media",
    description: "Студенческий медиацентр СОГУ",
    logo: "/images/branding/logos/logo-record.png",
  },
];
