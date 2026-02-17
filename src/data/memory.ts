export type MemoryParticipant = {
  id: string;
  name: string;
  photo: string;
  curatorId: string;
  curatorName: string;
};

export type MemoryCuratorTeam = {
  id: string;
  curatorName: string;
  members: string[];
};

export type CuratorMemoryCard = {
  id: string;
  curatorName: string;
  teamName: string;
  text: string;
};

export type MemoryTimelineEvent = {
  id: string;
  day: string;
  title: string;
  description: string;
  photo: string;
};

export type MemoryTrack = {
  id: string;
  title: string;
  artist: string;
  coverSrc: string;
  audioSrc: string;
  durationLabel: string;
};

export type MemoryWish = {
  id: string;
  author?: string;
  role?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  featured?: boolean;
};

export type MemoryAnonymousMessage = {
  id: string;
  text: string;
  mood: string;
  moment: string;
};

export const memoryCuratorTeams: MemoryCuratorTeam[] = [
  {
    id: "uruzmag",
    curatorName: "Урузмаг",
    members: [
      "Бритаева Анна Асланбековна",
      "Кабисова Алина",
      "Маргиева Камилла Джониевна",
      "Айларова Амина Черменовна",
      "Савлохова Елизавета Хетаговна",
      "Хохоева Луиза Эдуардовна",
      "Алимбиев Бислан Зейнаддинович",
      "Уртаев Тамерлан Батразович",
      "Камболов Сармат Арсенович",
      "Фидаров Заурбек Феликсович",
    ],
  },
  {
    id: "alana",
    curatorName: "Алана",
    members: [
      "Антонова Ангелина Вячеславовна",
      "Бугулова Диана Витальевна",
      "Гурдзибеева Карина Алановна",
      "Елдзарова Алина Алановна",
      "Савхалова Елизавета Алановна",
      "Жажиева Фатима Руслановна",
      "Коблова Зарина Аслановна",
      "Гетежев Марат Муратович",
      "Баскаев Константин Владимирович",
      "Гаглоев Хетаг Уырысбиевич",
    ],
  },
  {
    id: "dayana",
    curatorName: "Даяна",
    members: [
      "Мукагова Дзерасса Аслабековна",
      "Амбалова Инна Валерьевна",
      "Мильдзихова Амалия Владимировна",
      "Кибизова Дина Тимуровна",
      "Ходова Алана Султановна",
      "Цакоева Лика Робертовна",
      "Балашвили Давид Зурабович",
      "Кокоев Артур Львович",
      "Костанов Сармат Вадимович",
      "Персаев Владислав Черменович",
    ],
  },
  {
    id: "polina",
    curatorName: "Полина",
    members: [
      "Барвинюк Анастасия Маратовна",
      "Джимиева Самиля Вячеславовна",
      "Бирагова Диана Заурбековна",
      "Дзгоева Мария Олеговна",
      "Макаева Оксана Олеговна",
      "Томаева Дзерасса Казбековна",
      "Фазилова Гузель Бахтиёровна",
      "Ботоев Алан Батразович",
      "Ужегова Мадина Хазбиевна",
    ],
  },
];

export const memoryParticipantPhotoByName: Partial<Record<string, string>> = {
  "Бритаева Анна Асланбековна": "/images/memory/participants/britaeva-anna.jpg",
  "Кабисова Алина": "/images/memory/participants/kabisova-alina.jpg",
  "Маргиева Камилла Джониевна": "/images/memory/participants/margieva-kamilla.jpg",
  "Айларова Амина Черменовна": "/images/memory/participants/ailarova-amina.jpg",
  "Савлохова Елизавета Хетаговна": "/images/memory/participants/savlohova-liza.jpg",
  "Хохоева Луиза Эдуардовна": "/images/memory/participants/hohoeva-luiza.jpg",
  "Алимбиев Бислан Зейнаддинович": "/images/memory/participants/alymbiev-bislan.jpg",
  "Уртаев Тамерлан Батразович": "/images/memory/participants/urtaev-tamerlan.jpg",
  "Камболов Сармат Арсенович": "/images/memory/participants/kambolov-sarmat.jpg",
  "Фидаров Заурбек Феликсович": "/images/memory/participants/fidarov-zaur.jpg",
  "Антонова Ангелина Вячеславовна": "/images/memory/participants/antonova-angelina.jpg",
  "Бугулова Диана Витальевна": "/images/memory/participants/bugulova-diana.jpg",
  "Гурдзибеева Карина Алановна": "/images/memory/participants/gurzibeeva-karina.jpg",
  "Елдзарова Алина Алановна": "/images/memory/participants/eldzarova-alina.jpg",
  "Савхалова Елизавета Алановна": "/images/memory/participants/savhalova-liza.jpg",
  "Жажиева Фатима Руслановна": "/images/memory/participants/jajieva-fatima.jpg",
  "Коблова Зарина Аслановна": "/images/memory/participants/koblova-zarina.jpg",
  "Гетежев Марат Муратович": "/images/memory/participants/getejev-marat.jpg",
  "Баскаев Константин Владимирович": "/images/memory/participants/baskaev-konstantin.jpg",
  "Гаглоев Хетаг Уырысбиевич": "/images/memory/participants/gagloev-hetag.jpg",
  "Мукагова Дзерасса Аслабековна": "/images/memory/participants/mukagova-dzera.jpg",
  "Амбалова Инна Валерьевна": "/images/memory/participants/ambalova-inna.jpg",
  "Мильдзихова Амалия Владимировна": "/images/memory/participants/mildzihova-amalya.jpg",
  "Кибизова Дина Тимуровна": "/images/memory/participants/kibisova-dina.jpg",
  "Ходова Алана Султановна": "/images/memory/participants/hodova-alana.jpg",
  "Цакоева Лика Робертовна": "/images/memory/participants/tsakoeva-lika.jpg",
  "Балашвили Давид Зурабович": "/images/memory/participants/balashvili-david.jpg",
  "Кокоев Артур Львович": "/images/memory/participants/kokoev-artur.jpg",
  "Костанов Сармат Вадимович": "/images/memory/participants/kostanov-sarman.jpg",
  "Персаев Владислав Черменович": "/images/memory/participants/persaev-vlad.jpg",
  "Барвинюк Анастасия Маратовна": "/images/memory/participants/barvinuk-anna.jpg",
  "Джимиева Самиля Вячеславовна": "/images/memory/participants/dzhimieva-samila.jpg",
  "Бирагова Диана Заурбековна": "/images/memory/participants/biragova-diana.jpg",
  "Дзгоева Мария Олеговна": "/images/memory/participants/dzgoeva-maria.jpg",
  "Макаева Оксана Олеговна": "/images/memory/participants/mamaeva-oksana.jpg",
  "Томаева Дзерасса Казбековна": "/images/memory/participants/tomaeva-dzerassa.jpg",
  "Фазилова Гузель Бахтиёровна": "/images/memory/participants/fazilova-guzel.jpg",
  "Ботоев Алан Батразович": "/images/memory/participants/botoev-alan.jpg",
  "Ужегова Мадина Хазбиевна": "/images/memory/participants/uzhegova-madina.jpg",
};

export const memoryParticipants: MemoryParticipant[] = memoryCuratorTeams.flatMap((team) =>
  team.members.map((name, index) => ({
    id: `${team.id}-${index + 1}`,
    name,
    photo: memoryParticipantPhotoByName[name] ?? "/images/organizers/prof/eduard-gagite.jpg",
    curatorId: team.id,
    curatorName: team.curatorName,
  })),
);

export const curatorMemoryCards: CuratorMemoryCard[] = [
  {
    id: "polina",
    curatorName: "Полина Осокина",
    teamName: "Команда Полины",
    text: `Мои ребята, я очень рада, что именно вы были моей командой на этом форуме. Мы прожили вместе 4 насыщенных дня по-настоящему ценных. Столько эмоций, разговоров, смеха, волнений и маленьких побед - и всё это останется со мной надолго.
Вы талантливые, яркие и такие разные - и в этом ваша сила. Каждый из вас по-своему проявился, и за этим было невероятно приятно наблюдать. Форум показал, как вы умеете действовать в условиях ограниченного времени, брать ответственность и поддерживать друг друга. Вы правда были командой.
А наши рефлексии - такие искренние, глубокие и тёплые моменты, когда вы делились мыслями, чувствами и открытиями. В них было столько настоящего, что я каждый раз ловила себя на мысли, какие вы светлые и сильные.
И несмотря на то, что у нас был всего один мальчик, это ни капли не мешало нашей команде блистать! Его энергия, юмор и участие сделали наш коллектив ещё ярче. Он доказал, что настоящая сила команды - не в количестве, а в желании поддерживать друг друга и творить вместе.
Спасибо вам за доверие, за открытость, за смех до слёз и за поддержку друг друга. Пусть этот опыт станет только началом большого пути. Не бойтесь проявляться, смело берите возможности и всегда верьте в себя - у вас огромный потенциал.
Вы навсегда останетесь в моём сердце. Я горжусь вами и очень благодарна за эти 4 дня, которые мы прожили вместе 🤍
Мои Дзера, Мария, Настя, Самиля, Гузель, Ксюша, Мадина, Диана и Алан)`,
  },
  {
    id: "uruzmag",
    curatorName: "Урузмаг Елоев",
    teamName: "Команда Урузмага",
    text: `Мои самые светлые и добрые ребятки. Помните о чем я говорил вам перед форумом? Моей небольшой мечтой и целью было сделать из нас не просто команду, а настоящую маленькую семью, где дорожат каждой секундой, проведенной вместе. Чтобы, встречаясь, вы не просто проходили мимо, а останавливались, обнимались и с теплотой здоровались друг с другом. Глядя на вас сейчас я не могу подобрать слов чтобы описать свою радость - у меня это получилось!!!! И получилось только благодаря вам, вашему желанию быть единым целым. Мне невозможно описать насколько я горжусь каждым из вас. Вы - самые лучшие, в моем сердце вы останетесь такими навсегда. Спасибо вам за эту семью`,
  },
  {
    id: "dayana",
    curatorName: "Даяна Дарчиева",
    teamName: "Команда Даяны",
    text: `Мои любимые - эта команда была про сплочённость, юмор и самые лучшие, глубокие рефлексии.
В первый день мне было сложно что-то сказать, ведь я почти никого не знала. Кто-то показался мне незаинтересованным, кто-то - закрытым. Я не понимала сработаемся ли мы, получится ли у нас вообще стать командой. А потом случились мы.

Я до сих пор помню, как мы за один час создали танец, как снимали «Студ2» , много раз репетировали ту песенку. Это был тот момент, когда я по-настоящему почувствовала гордость. Не за результат - а за то, как вы включились, как слушали друг друга, как старались сделать всё вместе. Вы подходили к каждому заданию внимательно и искренне. С каждым днём вы раскрывались всё сильнее и глубже.
Это был мой первый опыт в роли куратора. И именно с вами я поняла, что это то, чем мне действительно хочется заниматься. Я поняла, как быстро могу привязаться к людям, как сильно начинаю за них переживать и как радуюсь их маленьким и большим победам. Мне так приятно, что каждый день вы ждали именно наши с вами рефлексии, к нам заходили другие участники и организаторы, говоря о том, что у нас очень интересно и душевно. Это именно то, чего я хотела добиться.

И если бы я могла сказать каждому из вас что-то одно, я бы сказала:
пожалуйста, не бойтесь пробовать себя в разных направлениях и организациях, несмотря на мнение других людей.

Лика, Алана, Дзера, Амалия, Дина, Инна, Давид, Сармат, Артур и Влад, СПАСИБО  вам за доверие, за то, что сделали мой первый опыт в роли куратора таким тёплым и настоящим.

Вы навсегда останетесь в моём ❤️`,
  },
  {
    id: "alana",
    curatorName: "Алана Габараева",
    teamName: "Команда Аланы",
    text: `Моя родня, мой первый кураторский опыт и мои самые искренние, душевные и ответственные ребята, я вас люблю.
Я так счастлива, что именно я была вашим куратором, что каждый из вас был именно моим.
Может я и не была лучшей во всём, зато вы – да.
Каждое правило, введенное мной на рефлексиях, всегда соблюдалось с уважением.
На каждой лекции вы всегда были первой командой, которая за минуту уже сидела в зале.
Каждый день вы удивляли своими умениями, креативом и горящими глазами.
Вы у меня такие разные, я ведь не один раз вам это говорила.
Индивидуальные, необычные, тёплые – каждый близок по-своему, каждый моя особенная звёздочка.
Я так рада была понемногу вас раскрывать, по крупицам собирать ваши настоящие образы, помогать смело шагать в эту новую, совершенно неизведанную студенческую жизнь.
У каждого из вас такое красивое и необъятное сердце.
В каждом из вас ещё столько тайн, которые вам самим предстоит разгадать.
В каждом из вас столько добра, которым чуть позже сможете поделиться со своими ребятами вы, как я поделилась с вами.
В каждом из вас много всего, мои замечательные.
Вы ведь помните?
Нашей задачей было найти в этом месте и увезти с собой нечто особенное – у каждого свое.
Любовь, себя, знания – что угодно.
И вы нашли, я это точно знаю.
Спасибо вам всем за самые душевные рефлексии, за крепкие объятия, за любовь, за доверие, за честность, за то, что мы с вами выбрали друг друга.
Я научила вас, а вы меня.
И вы навсегда в моем сердце.
Надеюсь, и я в вашем.
Смело идите дальше, ловите моменты, наслаждайтесь студенчеством, познавайте новое, а я всегда буду рядом и помогу в любой трудной ситуации, будь то таблетки от горла или любовный вопрос.
До вас были грубые мантры, до вас было, в целом, не мило.
Ваша Алана.`,
  },
];

export const memoryTimeline: MemoryTimelineEvent[] = [
  {
    id: "arrival",
    day: "8 февраля",
    title: "Заезд и первый круг знакомств",
    description:
      "Заселение, знакомство с командами и первые шаги к общему ритму форума.",
    photo: "/images/atmosphere/photo-1.jpg",
  },
  {
    id: "opening",
    day: "8 февраля",
    title: "Открытие и вечерний квиз",
    description:
      "Торжественный старт, первые эмоции и командная проверка на скорость мышления.",
    photo: "/images/atmosphere/photo-2.jpg",
  },
  {
    id: "practice",
    day: "9 февраля",
    title: "Лекции и практикум по медиасопровождению",
    description:
      "Участники собрали идеи, обсудили продвижение и начали работу над своими концепциями.",
    photo: "/images/atmosphere/photo-3.jpg",
  },
  {
    id: "teamwork",
    day: "10 февраля",
    title: "Командная работа под дедлайном",
    description:
      "Распределение ролей, бюджетирование и прокачка навыков коммуникации в реальном темпе.",
    photo: "/images/atmosphere/photo-4.jpg",
  },
  {
    id: "final-projects",
    day: "11 февраля",
    title: "Финальные презентации проектов",
    description:
      "Команды представили концепции мероприятий и получили живую обратную связь от экспертов.",
    photo: "/images/atmosphere/photo-5.jpg",
  },
  {
    id: "farewell",
    day: "12 февраля",
    title: "Прощание и выезд",
    description:
      "Последние объятия, личные открытия и ощущение, что это только начало большого пути.",
    photo: "/images/atmosphere/photo-6.jpg",
  },
];

export const memoryPlaylist = {
  title: "Плейлист СтудСтарта",
  description:
    "Треки, которые звучали в дороге, на репетициях и в вечерних активностях форума.",
  spotifyUrl: "https://open.spotify.com/playlist/3n3CkoC1gwDjcEt7AY2p7C?si=67a742b172bd45cb",
  spotifyTitle: "СтудСтарт 2026",
  spotifyAvatar: "/images/branding/logos/logo-playlist.png",
  tracks: [
    {
      id: "track-1",
      title: "Я вновь сюда вернусь",
      artist: "Анзор Мæхъиты",
      coverSrc: "/images/memory/playlist/tracks/track-1.jpg",
      audioSrc: "/audio/memory-playlist/Anzor_Mkhity_-_YA_vnov_syuda_vernus.mp3",
      durationLabel: "4:37",
    },
    {
      id: "track-2",
      title: "На заре",
      artist: "Баста",
      coverSrc: "/images/memory/playlist/tracks/track-2.jpg",
      audioSrc: "/audio/memory-playlist/Basta_-_Na_zare.mp3",
      durationLabel: "5:06",
    },
    {
      id: "track-3",
      title: "Danika House",
      artist: "unhealthy zoglin",
      coverSrc: "/images/memory/playlist/tracks/track-3.jpg",
      audioSrc: "/audio/memory-playlist/unhealthy_zoglin_-_Danika_House_LB_By_k3nz1.mp3",
      durationLabel: "5:53",
    },
    {
      id: "track-4",
      title: "Цунами",
      artist: "NYUSHA",
      coverSrc: "/images/memory/playlist/tracks/track-4.jpg",
      audioSrc: "/audio/memory-playlist/Nyusha_-_Cunami.mp3",
      durationLabel: "4:09",
    },
    {
      id: "track-5",
      title: "Между нами любовь",
      artist: "SEREBRO",
      coverSrc: "/images/memory/playlist/tracks/track-5.jpg",
      audioSrc: "/audio/memory-playlist/SEREBRO_-_Mezhdu_nami_lyubov.mp3",
      durationLabel: "3:11",
    },
  ] satisfies MemoryTrack[],
};

export const memoryWishes: MemoryWish[] = [
  {
    id: "wish-photo-1",
    imageSrc: "/images/memory/wishes/sticker-01.jpg",
    imageAlt: "Фото стикера 1",
  },
  {
    id: "wish-photo-2",
    imageSrc: "/images/memory/wishes/IMG_6796.jpg",
    imageAlt: "Фото стикера 2",
  },
  {
    id: "wish-photo-3",
    imageSrc: "/images/memory/wishes/IMG_6797.jpg",
    imageAlt: "Фото стикера 3",
  },
  {
    id: "wish-photo-4",
    imageSrc: "/images/memory/wishes/IMG_6798.jpg",
    imageAlt: "Фото стикера 4",
  },
  {
    id: "wish-photo-5",
    imageSrc: "/images/memory/wishes/IMG_6799.jpg",
    imageAlt: "Фото стикера 5",
  },
  {
    id: "wish-photo-6",
    imageSrc: "/images/memory/wishes/IMG_6800.jpg",
    imageAlt: "Фото стикера 6",
  },
  {
    id: "wish-photo-7",
    imageSrc: "/images/memory/wishes/IMG_6801.jpg",
    imageAlt: "Фото стикера 7",
  },
  {
    id: "wish-photo-8",
    imageSrc: "/images/memory/wishes/IMG_6802.jpg",
    imageAlt: "Фото стикера 8",
  },
  {
    id: "wish-photo-9",
    imageSrc: "/images/memory/wishes/IMG_6804.jpg",
    imageAlt: "Фото стикера 9",
  },
  {
    id: "wish-photo-10",
    imageSrc: "/images/memory/wishes/IMG_6805.jpg",
    imageAlt: "Фото стикера 10",
  },
  {
    id: "wish-photo-11",
    imageSrc: "/images/memory/wishes/IMG_6806.jpg",
    imageAlt: "Фото стикера 11",
  },
  {
    id: "wish-photo-12",
    imageSrc: "/images/memory/wishes/IMG_6807.jpg",
    imageAlt: "Фото стикера 12",
  },
  {
    id: "wish-photo-13",
    imageSrc: "/images/memory/wishes/IMG_6808.jpg",
    imageAlt: "Фото стикера 13",
  },
  {
    id: "wish-photo-14",
    imageSrc: "/images/memory/wishes/IMG_6809.jpg",
    imageAlt: "Фото стикера 14",
  },
  {
    id: "wish-photo-15",
    imageSrc: "/images/memory/wishes/IMG_6810.jpg",
    imageAlt: "Фото стикера 15",
  },
  {
    id: "wish-photo-16",
    imageSrc: "/images/memory/wishes/IMG_6811.jpg",
    imageAlt: "Фото стикера 16",
  },
  {
    id: "wish-photo-17",
    imageSrc: "/images/memory/wishes/IMG_6812.jpg",
    imageAlt: "Фото стикера 17",
  },
  {
    id: "wish-photo-18",
    imageSrc: "/images/memory/wishes/IMG_6813.jpg",
    imageAlt: "Фото стикера 18",
  },
  {
    id: "wish-photo-19",
    imageSrc: "/images/memory/wishes/IMG_6814.jpg",
    imageAlt: "Фото стикера 19",
  },
  {
    id: "wish-photo-20",
    imageSrc: "/images/memory/wishes/IMG_6815.jpg",
    imageAlt: "Фото стикера 20",
  },
  {
    id: "wish-photo-21",
    imageSrc: "/images/memory/wishes/IMG_6816.jpg",
    imageAlt: "Фото стикера 21",
  },
  {
    id: "wish-photo-22",
    imageSrc: "/images/memory/wishes/IMG_6817.jpg",
    imageAlt: "Фото стикера 22",
  },
  {
    id: "wish-photo-23",
    imageSrc: "/images/memory/wishes/IMG_6818.jpg",
    imageAlt: "Фото стикера 23",
  },
  {
    id: "wish-photo-24",
    imageSrc: "/images/memory/wishes/IMG_6819.jpg",
    imageAlt: "Фото стикера 24",
  },
  {
    id: "wish-photo-25",
    imageSrc: "/images/memory/wishes/IMG_6820.jpg",
    imageAlt: "Фото стикера 25",
  },
  {
    id: "wish-photo-26",
    imageSrc: "/images/memory/wishes/IMG_6821.jpg",
    imageAlt: "Фото стикера 26",
  },
  {
    id: "wish-photo-27",
    imageSrc: "/images/memory/wishes/IMG_6822.jpg",
    imageAlt: "Фото стикера 27",
  },
  {
    id: "wish-photo-28",
    imageSrc: "/images/memory/wishes/IMG_6823.jpg",
    imageAlt: "Фото стикера 28",
  },
  {
    id: "wish-photo-29",
    imageSrc: "/images/memory/wishes/IMG_6824.jpg",
    imageAlt: "Фото стикера 29",
  },
  {
    id: "wish-photo-30",
    imageSrc: "/images/memory/wishes/IMG_6825.jpg",
    imageAlt: "Фото стикера 30",
  },
  {
    id: "wish-photo-31",
    imageSrc: "/images/memory/wishes/IMG_6826.jpg",
    imageAlt: "Фото стикера 31",
  },
  {
    id: "wish-photo-32",
    imageSrc: "/images/memory/wishes/IMG_6827.jpg",
    imageAlt: "Фото стикера 32",
  },
  {
    id: "wish-photo-33",
    imageSrc: "/images/memory/wishes/IMG_6828.jpg",
    imageAlt: "Фото стикера 33",
  },
  {
    id: "wish-photo-34",
    imageSrc: "/images/memory/wishes/IMG_6829.jpg",
    imageAlt: "Фото стикера 34",
  },
  {
    id: "wish-photo-35",
    imageSrc: "/images/memory/wishes/IMG_6830.jpg",
    imageAlt: "Фото стикера 35",
  },
  {
    id: "wish-photo-36",
    imageSrc: "/images/memory/wishes/IMG_6831.jpg",
    imageAlt: "Фото стикера 36",
  },
  {
    id: "wish-photo-37",
    imageSrc: "/images/memory/wishes/IMG_6832.jpg",
    imageAlt: "Фото стикера 37",
  },
  {
    id: "wish-photo-38",
    imageSrc: "/images/memory/wishes/IMG_6833.jpg",
    imageAlt: "Фото стикера 38",
  },
  {
    id: "wish-photo-39",
    imageSrc: "/images/memory/wishes/IMG_6835.jpg",
    imageAlt: "Фото стикера 39",
  },
  {
    id: "wish-photo-40",
    imageSrc: "/images/memory/wishes/IMG_6836.jpg",
    imageAlt: "Фото стикера 40",
  },
  {
    id: "wish-photo-41",
    imageSrc: "/images/memory/wishes/IMG_6837.jpg",
    imageAlt: "Фото стикера 41",
  },
  {
    id: "wish-photo-42",
    imageSrc: "/images/memory/wishes/IMG_6838.jpg",
    imageAlt: "Фото стикера 42",
  },
  {
    id: "wish-photo-43",
    imageSrc: "/images/memory/wishes/IMG_6839.jpg",
    imageAlt: "Фото стикера 43",
  },
  {
    id: "wish-photo-44",
    imageSrc: "/images/memory/wishes/IMG_6840.jpg",
    imageAlt: "Фото стикера 44",
  },
  {
    id: "wish-photo-45",
    imageSrc: "/images/memory/wishes/IMG_6841.jpg",
    imageAlt: "Фото стикера 45",
  },
];

export const memoryAnonymousMessages: MemoryAnonymousMessage[] = [
  {
    id: "anon-1",
    text: "Спасибо кураторам за то, что с первого дня сняли напряжение. Было ощущение, что нас правда ждали.",
    mood: "поддержка",
    moment: "день 1 • вечерняя рефлексия",
  },
  {
    id: "anon-2",
    text: "На репетициях было шумно, хаотично и очень весело. В какой-то момент мы стали настоящей командой.",
    mood: "драйв",
    moment: "день 2 • командный блок",
  },
  {
    id: "anon-3",
    text: "Поймал(а) себя на мысли, что бояться нового уже не хочется. После форума появилась уверенность.",
    mood: "мотивация",
    moment: "день 3 • после лекций",
  },
  {
    id: "anon-4",
    text: "Кто отвечал за музыку - отдельное спасибо. Плейлист теперь ассоциируется с этими четырьмя днями.",
    mood: "вдохновение",
    moment: "день 3 • вечер",
  },
  {
    id: "anon-5",
    text: "Самое ценное - люди. Мы приехали незнакомыми, а уехали с ощущением, что нашли своих.",
    mood: "тепло",
    moment: "день 4 • финал",
  },
  {
    id: "anon-6",
    text: "Иногда казалось, что не справимся по таймингу, но команда каждый раз собиралась и делала невозможное.",
    mood: "команда",
    moment: "день 2 • дедлайны",
  },
  {
    id: "anon-7",
    text: "Рефлексии оказались гораздо глубже, чем ожидал(а). Было безопасно говорить честно.",
    mood: "искренность",
    moment: "день 2 • ночной круг",
  },
  {
    id: "anon-8",
    text: "Спасибо за атмосферу без пафоса: живо, по-настоящему и очень по-человечески.",
    mood: "благодарность",
    moment: "день 4 • перед выездом",
  },
  {
    id: "anon-9",
    text: "Форум закончился, а ощущение движения вперед осталось. Хочется включаться в новые проекты.",
    mood: "импульс",
    moment: "после форума",
  },
  {
    id: "anon-10",
    text: "Самый сильный инсайт: не обязательно быть самым громким, чтобы быть важной частью команды.",
    mood: "осознание",
    moment: "день 3 • проектная работа",
  },
];
