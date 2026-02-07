export type Organizer = {
  id: string;
  name: string;
  role: string;
  photo?: string | null;
};

export type OrganizerGroup = {
  id: string;
  name: string;
  description?: string;
  fallbackLogo?: string;
  members: Organizer[];
};

export const organizerGroups: OrganizerGroup[] = [
  {
    id: "university",
    name: "Университет",
    description: "Администрация и руководство направлениями форума.",
    fallbackLogo: "/images/logo-sogu.png",
    members: [
      {
        id: "kokaev-alan",
        name: "Кокаев Алан Таймуразович",
        role: "Проректор по молодежной политике и административной работе",
        photo: "/images/organizers/uni/alan-kokaev.jpg",
      },
      {
        id: "khanaev-izmail",
        name: "Ханаев Измаил Сергеевич",
        role: "Начальник управления по молодежной политике и социальным вопросам",
        photo: "/images/organizers/uni/izmail-khanaev.png",
      },
      {
        id: "makiev-anzor",
        name: "Макиев Анзор Аполлонович",
        role: "Директор студенческого спортивного клуба",
        photo: "/images/organizers/uni/anzor-makiev.jpg",
      },
      {
        id: "farnieva-elizaveta",
        name: "Фарниева Елизавета Витальевна",
        role: "Начальник отдела молодежной политики, физической культуры и спорта",
        photo: "/images/organizers/uni/elizaveta-farnieva.jpg",
      },
    ],
  },
  {
    id: "profkom",
    name: "Профком",
    description: "Команда, которая держит весь форум в тонусе.",
    fallbackLogo: "/images/logo-profkom.png",
    members: [
      {
        id: "farnieva-elizaveta",
        name: "Фарниева Елизавета",
        role: "Генеральный директор форума",
        photo: "/images/organizers/prof/elizaveta-farnieva.jpg",
      },
      {
        id: "mamaeva-sabina",
        name: "Мамаева Сабина",
        role: "Исполнительный директор форума",
        photo: "/images/organizers/prof/sabina-mamaeva.jpg",
      },
      {
        id: "gagite-eduard",
        name: "Гагитэ Эдуард",
        role: "Гений, миллиардер, плейбой и IT специалист",
        photo: "/images/organizers/prof/eduard-gagite.jpg",
      },
      {
        id: "chekhoev-ruslan",
        name: "Чехоев Руслан",
        role: "Информационное сопровождение и главный фанат Эдуарда",
        photo: "/images/organizers/prof/ruslan-chekhoev.jpg",
      },
      {
        id: "gabaraeva-alana",
        name: "Габараева Алана",
        role: "Куратор",
        photo: "/images/organizers/prof/alana-gabaraeva.jpg",
      },
      {
        id: "darchieva-dayana",
        name: "Дарчиева Даяна",
        role: "Куратор",
        photo: "/images/organizers/prof/dayana-darchieva.jpg",
      },
      {
        id: "eloev-uruzmag",
        name: "Елоев Урузмаг",
        role: "Куратор",
        photo: "/images/organizers/prof/uruzmag-eloev.jpg",
      },
      {
        id: "osokina-polina",
        name: "Осокина Полина",
        role: "Куратор",
        photo: "/images/organizers/prof/polina-osokina.jpg",
      },
      {
        id: "dobaeva-elizabett",
        name: "Добаева Элизабетт",
        role: "Работа со спикерами",
        photo: "/images/organizers/prof/elizabetta-dobaeva.jpg",
      },
      {
        id: "biragov-marat",
        name: "Бирагов Марат",
        role: "Господин ведущий пэпэ",
        photo: "/images/organizers/prof/marat-biragov.jpg",
      },
      {
        id: "dzhioev-oleg",
        name: "Джиоев Олег",
        role: "Ответственный за чай Эдуарду и за работу с участниками",
        photo: "/images/organizers/prof/oleg-dzhioev.jpg",
      },
      {
        id: "doev-zaurbek",
        name: "Доев Заурбек",
        role: "Организатор вечерней программы",
        photo: "/images/organizers/prof/zaurber-doev.jpg",
      },
      {
        id: "prostak-maria",
        name: "Простак Мария",
        role: "Организатор вечерней программы",
        photo: "/images/organizers/prof/maria-prostak.jpg",
      },
      {
        id: "yudina-sofia",
        name: "Юдина София",
        role: "Организатор вечерней программы",
        photo: "/images/organizers/prof/sofia-yudina.jpg",
      },
      {
        id: "kozaeva-diana",
        name: "Козаева Диана",
        role: "Организатор вечерней программы",
        photo: "/images/organizers/prof/diana-kozaeva.jpg",
      },
      {
        id: "chugunov-georgiy",
        name: "Чугунов Георгий",
        role: "Группа контроля",
        photo: "/images/organizers/prof/geor-chugunov.jpg",
      },
    ],
  },
  {
    id: "record-media",
    name: "Record Media",
    description: "Медиа-команда форума.",
    fallbackLogo: "/images/logo-record.png",
    members: [
      {
        id: "valiev-david",
        name: "Валиев Давид",
        role: "Видеомейкер",
        photo: "/images/organizers/record/david-valiev.jpg",
      },
      {
        id: "dryaev-marat",
        name: "Дряев Марат",
        role: "Корреспондент",
        photo: "/images/organizers/record/marat-dryaev.jpg",    
      },
      {
        id: "basieva-alina",
        name: "Басиева Алина",
        role: "Фотограф",
        photo: "/images/organizers/record/alina-basieva.jpg",
      },
      {
        id: "gubzhokova-diana",
        name: "Губжокова Диана",
        role: "Рилсмейкер",
        photo: "/images/organizers/record/gubzhokova-diana.jpg",
      },
    ],
  },
];
