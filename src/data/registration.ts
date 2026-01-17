export type RegistrationField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "date" | "radio";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  step: number;
};

export const registrationFields: RegistrationField[] = [
  // Step 1: Контакты
  {
    id: "fullName",
    label: "ФИО",
    type: "text",
    required: true,
    placeholder: "Иванова Алина Сергеевна",
    step: 1,
  },
  {
    id: "phone",
    label: "Телефон",
    type: "tel",
    required: true,
    placeholder: "+7 999 000-00-00",
    step: 1,
  },
  {
    id: "telegram",
    label: "Telegram",
    type: "text",
    required: true,
    placeholder: "@username",
    step: 1,
  },
  {
    id: "course",
    label: "Курс",
    type: "select",
    required: true,
    options: ["1 курс", "2 курс"],
    placeholder: "Выберите курс",
    step: 1,
  },
  {
    id: "faculty",
    label: "Факультет",
    type: "select",
    required: true,
    placeholder: "Выберите факультет",
    options: [
      "Исторический факультет",
      "Медицинский факультет",
      "Психолого-педагогический факультет",
      "Факультет естественных наук и технологий",
      "Факультет журналистики",
      "Факультет математики и компьютерных наук",
      "Факультет международных отношений",
      "Факультет осетинской филологии",
      "Факультет русской филологии",
      "Факультет физической культуры и спорта",
      "Факультет экономики и управления",
      "Факультет искусств",
      "Юридический факультет",
    ],
    step: 1,
  },

  // Step 2: Мотивация (Q1-Q4)
  {
    id: "q1_why",
    label: "Почему ты хочешь поехать на форум? (1–2 предложения)",
    type: "textarea",
    required: true,
    placeholder: "Хочу найти новых друзей и...",
    step: 2,
  },
  {
    id: "q2_expectations",
    label: "Что ты хочешь получить от поездки лично для себя?",
    type: "textarea",
    required: true,
    placeholder: "Новые навыки, эмоции...",
    step: 2,
  },
  {
    id: "q3_social",
    label: "Готов(а) ли ты знакомиться с новыми людьми и “включаться” в активности? (0–10)",
    type: "select",
    required: true,
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    step: 2,
  },
  {
    id: "q4_difficulties",
    label: "Что для тебя самое “трудное” в поездках? (1 короткий пункт)",
    type: "text",
    required: true,
    placeholder: "Ранние подъемы / Отсутствие интернета...",
    step: 2,
  },

  // Step 3: Орг моменты (Q5-Q7)
  {
    id: "q5_health",
    label: "Есть ли ограничения по здоровью/питанию, которые важно учесть? (да/нет + что именно)",
    type: "textarea",
    required: true,
    placeholder: "Нет / Да, аллергия на цитрусовые...",
    step: 3,
  },
  {
    id: "q6_source",
    label: "Как ты предпочитаешь получать инфу?",
    type: "radio",
    required: true,
    options: ["Телеграм", "Сайт"],
    step: 3,
  },
  {
    id: "q7_organization",
    label: "Состоишь ли ты в какой-либо организации или стажируешься?",
    type: "textarea",
    required: true,
    placeholder: "Профком, Волонтеры Победы...",
    step: 3,
  },

  // Step 4: Вопросы отбора (Q8-Q10)
  {
    id: "q8_why_you",
    label: "Почему нам стоит взять именно тебя, а не еще 10 человек с такими же ответами?",
    type: "textarea",
    required: true,
    placeholder: "Потому что я...",
    step: 4,
  },
  {
    id: "q9_projects",
    label: "Есть ли у тебя идеи или проекты, которые ты хотел(а) бы реализовать в университете?",
    type: "textarea",
    required: true,
    placeholder: "Клуб любителей настолок...",
    step: 4,
  },
  {
    id: "q10_boring_work",
    label: "Какую самую скучную или тяжелую работу тебе приходилось делать в составе команды? Что тебя мотивировало продолжать ее выполнять?",
    type: "textarea",
    required: true,
    placeholder: "Перебирал архив...",
    step: 4,
  },

  // Step 5: Планы (Q11)
  {
    id: "q11_future",
    label: "Как ты планируешь использовать знания, полученные на школе актива, когда вернешься в вуз?",
    type: "textarea",
    required: true,
    placeholder: "Буду применять в...",
    step: 5,
  },
];

export const stepTitles: Record<number, string> = {
  1: "Контакты",
  2: "Мотивация",
  3: "Орг. моменты",
  4: "Отбор",
  5: "Планы",
};
