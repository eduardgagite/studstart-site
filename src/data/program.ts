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
      { time: "12:00 - 13:00", title: "Заезд, расселение участников" },
      { time: "13:30 - 14:30", title: "Обед" },
      {
        time: "15:30 - 16:30",
        title: "Лекция «Молодежная политика СОГУ»",
        description: "Измаил Ханаев",
      },
      {
        time: "16:30 - 17:30",
        title: "Лекция «Возможности развития молодежи Северной Осетии»",
        description: "Сабина Мамаева",
      },
      { time: "17:30 - 18:00", title: "Командообразование" },
      { time: "18:00 - 19:00", title: "Ужин" },
      { time: "19:00 - 19:30", title: "Открытие" },
      { time: "19:30 - 22:30", title: "Квиз" },
      { time: "22:30 - 23:00", title: "Рефлексия" },
      { time: "23:00", title: "Отбой" },
    ],
  },
];
