export type ProgramEntry = {
  time: string;
  title: string;
  description?: string;
};

export type ProgramDay = {
  date: string;
  label: string;
  entries: ProgramEntry[];
};

export const programDays: ProgramDay[] = [
  {
    date: "8 февраля",
    label: "День старта",
    entries: [
      { time: "12:00", title: "Заезд и размещение" },
      { time: "14:30", title: "Открытие форума" },
      { time: "16:00", title: "Командный старт" },
      { time: "19:00", title: "Вечер знакомств" },
    ],
  },
  {
    date: "9 февраля",
    label: "День команды",
    entries: [
      { time: "10:00", title: "Утренний заряд" },
      { time: "11:30", title: "Тренинг по коммуникации" },
      { time: "15:00", title: "Командный квест" },
      { time: "20:00", title: "Творческая программа" },
    ],
  },
  {
    date: "10 февраля",
    label: "День идеи",
    entries: [
      { time: "10:30", title: "Лекции и интерактивы" },
      { time: "13:00", title: "Практикум по проектам" },
      { time: "16:00", title: "Встреча со спикером" },
      { time: "19:30", title: "Ночной формат" },
    ],
  },
  {
    date: "11 февраля",
    label: "День роста",
    entries: [
      { time: "10:00", title: "Формат наставничества" },
      { time: "12:30", title: "Командные задания" },
      { time: "16:00", title: "Свободное время" },
      { time: "20:00", title: "Вечер под звездами" },
    ],
  },
  {
    date: "12 февраля",
    label: "Финал",
    entries: [
      { time: "10:00", title: "Итоги и награждение" },
      { time: "12:00", title: "Сборы" },
      { time: "14:00", title: "Отъезд" },
    ],
  },
];
