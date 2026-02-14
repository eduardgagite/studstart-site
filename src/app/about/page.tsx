import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InstagramIcon, TelegramIcon } from "@/components/ui/icons";
import { MemoryTracksInteractive } from "@/components/memory-tracks-interactive";
import {
  curatorMemoryCards,
  memoryParticipantPhotoByName,
  memoryCuratorTeams,
  memoryParticipants,
  memoryPlaylist,
} from "@/data/memory";
import { MemoryWishesSection } from "@/components/memory-wishes-section";
import { MemoryAnonymousMessagesSection } from "@/components/memory-anonymous-messages-section";
import { CuratorTeamOrbit } from "@/components/curator-team-orbit";
import { MemoryParticipantStickers } from "@/components/memory-participant-stickers";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Как это было",
  description: "Как это было на СтудСтарте: истории, команды, события, музыка и пожелания участников.",
};

type FireflyStyle = CSSProperties & Record<`--${string}`, string>;

export default function AboutPage() {
  const djInstagramUrl = "http://instagram.com/edublago/";
  const djTelegramUrl = "http://t.me/edublago";
  const ruCollator = new Intl.Collator("ru", { sensitivity: "base" });
  const forumVibeTrack =
    memoryPlaylist.tracks.find((track) => track.artist.toLocaleLowerCase("ru").includes("анзор")) ??
    memoryPlaylist.tracks[0];

  const participantFeedbackByName: Partial<Record<string, string>> = {
    "Антонова Ангелина Вячеславовна":
      "Честно, был худшего мнения о ней, но потом работая с ней в команде, понял что она прикольная и умная. С ней получается слаженно работать, она дает дельные советы и может привести команду в чувства, когда та уходит от правильного курса. Смешная, добавил ее в приватный канал",
    "Баскаев Константин Владимирович":
      "Самый жизнерадостный, веселый и открытый человек❤️",
    "Макаева Оксана Олеговна":
      "Оксана очень позитивная, жизнерадостная. И просто как человек добрый и хороший)",
    "Томаева Дзерасса Казбековна":
      "Ну знаете это очень позитивная и хорошая девочка, и показала она эта только под конец, начала доверять и привязываются, она очень эмоциональная, но только с теми кому доверяет, и ура Дзера а почти начала нам доверяяяяттттььь, а так вообще классная девочка, крутая, я уверен если она раскрылась бы сразу и начала бы в серьез заниматься, я бы не был на лидирующих местах поверьте 😉",
    "Дзгоева Мария Олеговна":
      "Мария ( марфуша ) Это просто что то очень спокойное , на первый взгляд , очень искренний человек , умеет работать в команде , круто работает и взаимодействует, раскладывает натальную карту и шатает картами таро 😉 очень светлый человечек .ЛЮБЛЮ ! ❤️",
    "Гурдзибеева Карина Алановна":
      "В ее словах чувствуется такая душевная теплота, что хочется общаться и работать с ней постоянно.)",
    "Гаглоев Хетаг Уырысбиевич": "Гениальный создатель недопонятого квеста",
    "Джимиева Самиля Вячеславовна":
      "ну если честно, то изначально она мне не понравилась, но потом раскрылась с другой стороны мили девочка веселая, добрая задействована во всем была много активничала и это прикольно вроде все",
    "Цакоева Лика Робертовна":
      "Лика очень приятная, позитивная и умная!!! Было очень круто работать с ней в одной команде! Она, как генератор идей, сразу придумывала что-то, что помогало работе. Сразу же придумала движения в танце и, помогала с сюжетом в сценке, которую мы снимали. В общем Лика крутая, я была очень рада, что познакомилась с ней!!!",
    "Бритаева Анна Асланбековна": "Лучшая сестра теперь моя ❤️🫂",
    "Елдзарова Алина Алановна": "Теплый отзыв- энергичная личность",
    "Жажиева Фатима Руслановна":
      "Фатима очень классная и светлая девочка, несмотря на то, что долго занимала ванну🤭, м жили в одном блоке и очень привязались друг к другу, спасибо ей за проведенное вместе время❤️🥰",
    "Фидаров Заурбек Феликсович":
      "Он очень активный, весёлый и приятный на общение. Этот запал и любовь к общему делу мне понравились",
    "Бугулова Диана Витальевна":
      "Дианочка, нежная и милая девчонка, сегодня дразнила ее крекерами, которые она полюбила😈💘Очень красивая, отзывчивая, я уверена что она станет лучшим стоматологом страны, а ты и мира💞я рада, что форум познакомил меня с таким человеком как она 💋♾️",
    "Кибизова Дина Тимуровна":
      "Дина показалась мне милашкой, очень приятная девушка, очень понравилась мне, к сожалению мне не довелось поработать с ней в одной команде на практикумах, но в общении она казалась очень дружелюбной и приветливой . С каждый днем на рефлексиях она раскрывалась все сильнее и слушать её было все интереснее. Я надеюсь, что в последствии мы ещё будем с ней пересекаться :)))",
    "Коблова Зарина Аслановна":
      "Не особо многословна, но своим присутствием на рефлексиях она создавала классный вайб. Мне кажется она тот человек с которым молчание не кажется неприятным, а наоборот ощущается комфортным. Еще она ооооч красивая",
    "Алимбиев Бислан Зейнаддинович":
      "🥹Я рада,что была с ним в одной команде!!!ВО-ПЕРВЫХ,Я В ШОКЕЕЕЕ ОН С ЧЕЧНИ!!Бислан,человек который умеет правильно материться( он умеет их правильно вставлять в свою речь)и это всегда смешно❤️‍🩹спасибо тебе за добрые слова на закрытие,очень сильно ценю🤟🏻😝А так,хочу сказать что добрый,смешной,вайбовый…надеюсь будем товарищам)))",
    "Персаев Владислав Черменович":
      "Очень интересный человек! Умеет играть на всех инструментах постоянно напоминал про вертолет было приятно работать в одной команде",
    "Кабисова Алина":
      "Алина - активная, умная, быстро включается в в работу, человек который на всё скажет «ГАЗ» - я обожаю таких людей, не меняйся родная !!!",
    "Камболов Сармат Арсенович":
      "Сармат очень классный парень, он кажется начитанным и эрудированным человеком. С ним просто найти общий язык и общаться в целом. Одной ночью болтал с ним о музыке и, честно, это моя любимая тема для разговора, получилось обсудить много чего и услышать много чего нового и интересного, рассказать то, что остальным было бы не так интересно, как ему. Я рад, что он оказался в моей команде и мы с ним сдружились. Мне нравится, что он из себя никого не строит, он такой, какой он есть и ничего лишнего. Ещё он одевается классно, мне нравится его стиль, он мне близок. Короче говоря, хороший парень.",
    "Мильдзихова Амалия Владимировна":
      "Ученые выяснили, что 99% энергии каждой суперновы поглощает Амаля, и использует ее для каждого своего действия. Энергию которая исходит от нее при разговоре ученые оценивают примерно в 10^43 джоулей. Источник: Oxford University",
    "Айларова Амина Черменовна":
      "Дорогая, Айларова Амина Черменовна, очень хочется оставить теплое, солнечное(как и сама Амина) впечатление о тебе. Амина очень красивая, с невероятно искренней и светлой улыбкой девочка)у нее по-настоящему ангельский голос, когда она пела просто до мурашек) очень идейная и сообразительная, на наших стартах придумывала стратегию, с помощью которой было легче преодолевать задание) очень легко и приятно общаться) Рада нашей встрече и тому, что были в одной команде!!❤️",
    "Балашвили Давид Зурабович":
      "давид, я рада нашему знакомству и что за 5 дней я стала твоей бабу😂 как мне казалось и слава богу так и есть, ты душевный человек, с которым можно много о чем поговорить и поделиться🫂 надеюсь ты останешься таким же добрым, смешным и уютным каким являешься сейчас☺️ спасибо тебе за такие классные эмоции и за твою поддержку🫂 @Бабу",
    "Барвинюк Анастасия Маратовна":
      "Настя очень веселая, классная и креативная. Смонтировала видео для нашей команды за 20 минут",
    "Бирагова Диана Заурбековна":
      "Дианочка очень умная, классная и талантливая девочка. За любой движ просто крутышка. Говорила на рефлексиях всё, что я забывала сказать)",
    "Савлохова Елизавета Хетаговна":
      "Приятная, трудолюбивая , ответственная, веселая, добрая, целеустремленная, сильная и просто хороший человек 🫂",
    "Ходова Алана Султановна":
      "Познакомились в автобусе пока добирались на форму. Очень круто было в одной команде. Сначала думала, что не сможем найти общий язык, но я ошибалась. Понравилось вместе работать, было весело и интересно 😚",
    "Кокоев Артур Львович":
      "Супер позитивный человек, обладает двумя образованиями, ходил на самый лучший вид спорта(бокс).",
    "Маргиева Камилла Джониевна":
      "Камилла, ты очень талантливая девочка, на сцене ты сияешь, ты умная и очень красивая, И ПОЛЮБИ УЖЕ СВОИ ШТАНЫ (ТЕБЕ ОНИ ИДУТ), а еще в след раз НЕ НУЖНО В ТРИ НОЧИ СТУЧАТ НОГАМИ ПО БАТАРЕЯМ; будь счастлива, принцесса ❤️",
    "Фазилова Гузель Бахтиёровна":
      "Гузель очень милая, вот прям тютюююю, мы с ней хорошо подружились и классно общались, она мне очень понравилась и еще у нее хорошо получилось играть в нашей сценке 😜😜😜",
    "Хохоева Луиза Эдуардовна":
      "Моё мнение об этом человеке не поменялось с первого же дня, она мега зажигалочка, но ей надо не потухнуть, а реализовать свой потенциал!!!! Очень люблю всю команду (Урузмаг forever)",
    "Ботоев Алан Батразович": "просто лучший",
    "Ужегова Мадина Хазбиевна":
      "Мадинаааа, очень милая и приятная девочка. У нее всегда идеальная укладка 😭💕",
    "Уртаев Тамерлан Батразович":
      "Тамик очень крутой. Я повторюсь о том, что говорил на нашей последней рефлексии: я думал, что он со 2 или 3 курса, но оказалось, что он младше меня. Даже несмотря на это, я знал, что он очень хороший. И это оказалось правдой. На форуме я узнал его с другой стороны, то есть, я увидел, как он может проявлять свои лидерские (и не только) качества. Я не знаю человека, который за весь форум говорил бы о нем что-то плохое. Крч очень крутой челик , обожаю его",
    "Костанов Сармат Вадимович":
      "Умный, активный но слишком пафосный. Было бы не так круто и интересно, если бы его там не было",
    "Мукагова Дзерасса Аслабековна":
      "Дзерочка, моя любовь, ты самая клевая и крутая. Жду наши совместные поездки 😈",
    "Амбалова Инна Валерьевна":
      "Инна очень классная девчуля🫂я очень рада что мы были в одной команде,было приятно провести с ней время🤍 отдельная благодарность за дом 2 люблю,свою команду!💕",
    "Гетежев Марат Муратович":
      "Если честно, очень очень классный, позитивный, активный и деятельный парень, как хорошо, что ты не уехал и остался до конца!! Мы все были очень этому рады, продолжай так же активничать, у тебя хорошо получается. Знай, ты классный!",
  };

  const shortName = (value: string) => value.trim().split(/\s+/).slice(0, 2).join(" ");
  const curatorTeamMembersById = new Map(
    memoryCuratorTeams.map((team) => [team.id, team.members]),
  );
  const curatorPhotoById: Record<string, string> = {
    polina: "/images/organizers/prof/polina-osokina.jpg",
    uruzmag: "/images/organizers/prof/uruzmag-eloev.jpg",
    dayana: "/images/organizers/prof/dayana-darchieva.jpg",
    alana: "/images/organizers/prof/alana-gabaraeva.jpg",
  };

  const participantStickers = [...memoryParticipants]
    .sort((a, b) => ruCollator.compare(a.name, b.name))
    .map((participant) => {
      return {
        ...participant,
        shortName: shortName(participant.name),
        feedback: participantFeedbackByName[participant.name] ?? "",
      };
    });

  const fireflies: FireflyStyle[] = [
    { "--firefly-left": "6%", "--firefly-top": "10%", "--firefly-size": "0.34rem", "--firefly-drift-x": "9vw", "--firefly-drift-y": "16vh", "--firefly-duration": "16.5s", "--firefly-delay": "-8s" },
    { "--firefly-left": "16%", "--firefly-top": "32%", "--firefly-size": "0.26rem", "--firefly-drift-x": "-7vw", "--firefly-drift-y": "12vh", "--firefly-duration": "21s", "--firefly-delay": "-11s" },
    { "--firefly-left": "24%", "--firefly-top": "72%", "--firefly-size": "0.38rem", "--firefly-drift-x": "10vw", "--firefly-drift-y": "15vh", "--firefly-duration": "18.5s", "--firefly-delay": "-6s" },
    { "--firefly-left": "33%", "--firefly-top": "14%", "--firefly-size": "0.28rem", "--firefly-drift-x": "-8vw", "--firefly-drift-y": "18vh", "--firefly-duration": "23s", "--firefly-delay": "-14s" },
    { "--firefly-left": "41%", "--firefly-top": "46%", "--firefly-size": "0.31rem", "--firefly-drift-x": "7vw", "--firefly-drift-y": "13vh", "--firefly-duration": "19.5s", "--firefly-delay": "-9s" },
    { "--firefly-left": "48%", "--firefly-top": "86%", "--firefly-size": "0.24rem", "--firefly-drift-x": "-6vw", "--firefly-drift-y": "11vh", "--firefly-duration": "17s", "--firefly-delay": "-3s" },
    { "--firefly-left": "57%", "--firefly-top": "20%", "--firefly-size": "0.35rem", "--firefly-drift-x": "8vw", "--firefly-drift-y": "15vh", "--firefly-duration": "20s", "--firefly-delay": "-10s" },
    { "--firefly-left": "64%", "--firefly-top": "58%", "--firefly-size": "0.27rem", "--firefly-drift-x": "-9vw", "--firefly-drift-y": "17vh", "--firefly-duration": "22.5s", "--firefly-delay": "-15s" },
    { "--firefly-left": "72%", "--firefly-top": "8%", "--firefly-size": "0.39rem", "--firefly-drift-x": "11vw", "--firefly-drift-y": "14vh", "--firefly-duration": "18s", "--firefly-delay": "-12s" },
    { "--firefly-left": "79%", "--firefly-top": "36%", "--firefly-size": "0.3rem", "--firefly-drift-x": "-7vw", "--firefly-drift-y": "12vh", "--firefly-duration": "20.5s", "--firefly-delay": "-5s" },
    { "--firefly-left": "86%", "--firefly-top": "74%", "--firefly-size": "0.33rem", "--firefly-drift-x": "8vw", "--firefly-drift-y": "16vh", "--firefly-duration": "24s", "--firefly-delay": "-16s" },
    { "--firefly-left": "92%", "--firefly-top": "24%", "--firefly-size": "0.25rem", "--firefly-drift-x": "-6vw", "--firefly-drift-y": "10vh", "--firefly-duration": "17.5s", "--firefly-delay": "-7s" },
    { "--firefly-left": "12%", "--firefly-top": "88%", "--firefly-size": "0.3rem", "--firefly-drift-x": "7vw", "--firefly-drift-y": "13vh", "--firefly-duration": "19s", "--firefly-delay": "-13s" },
    { "--firefly-left": "27%", "--firefly-top": "52%", "--firefly-size": "0.29rem", "--firefly-drift-x": "-8vw", "--firefly-drift-y": "15vh", "--firefly-duration": "22s", "--firefly-delay": "-4s" },
    { "--firefly-left": "52%", "--firefly-top": "6%", "--firefly-size": "0.37rem", "--firefly-drift-x": "9vw", "--firefly-drift-y": "14vh", "--firefly-duration": "21.5s", "--firefly-delay": "-18s" },
    { "--firefly-left": "68%", "--firefly-top": "84%", "--firefly-size": "0.28rem", "--firefly-drift-x": "-7vw", "--firefly-drift-y": "12vh", "--firefly-duration": "18.8s", "--firefly-delay": "-2s" },
  ];

  return (
    <div className="memory-page">
      <div className="memory-fireflies" aria-hidden>
        {fireflies.map((style, index) => (
          <span key={`memory-firefly-${index + 1}`} className="memory-firefly" style={style} />
        ))}
      </div>

      <section className="section-panel memory-panel memory-panel-hero pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="section-inner space-y-8">
          <section className="section-shell memory-hero-shell overflow-hidden">
            <div className="memory-hero-orb memory-hero-orb-one" aria-hidden />
            <div className="memory-hero-orb memory-hero-orb-two" aria-hidden />
            <div className="memory-hero-grid">
              <div className="space-y-6">
                <p className="memory-hero-eyebrow">Как это было</p>
                <h1 className="memory-hero-title">
                  <span>Как это было</span>
                  <span className="memory-hero-title-accent">на СтудСтарте 2026</span>
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-lg">
                  Теплая хроника о людях, командах и моментах, которые сделали форум по-настоящему близким.
                </p>
                <div className="memory-chip-row">
                  <span className="memory-chip">живые лица</span>
                  <span className="memory-chip">голоса кураторов</span>
                  <span className="memory-chip">лучшие кадры по дням</span>
                </div>
              </div>

              <div className="memory-hero-stack">
                <article className="memory-hero-note memory-hero-note-main">
                  <p className="memory-hero-note-label">КАК ЭТО БЫЛО</p>
                  <p className="memory-hero-note-title">Люди. Команды. Моменты.</p>
                  <p className="memory-hero-note-copy">
                    Здесь собраны эмоции, открытия и тёплые воспоминания, к которым хочется возвращаться.
                  </p>
                </article>
                <article className="memory-hero-note memory-hero-note-tilt">
                  <p className="memory-hero-note-label">ФОКУС</p>
                  <p className="memory-hero-note-copy">
                    Истории участников, слова кураторов и ключевые моменты каждого дня.
                  </p>
                </article>
                <article className="memory-hero-note memory-hero-note-small">
                  <p className="memory-hero-note-label">2026</p>
                  <p className="memory-hero-note-copy">История, которая осталась с нами.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="section-shell memory-shell memory-shell-playlist space-y-5">
            <div className="memory-playlist-headline">
              <div className="max-w-2xl space-y-2">
                <p className="memory-kicker">Форумный саундтрек</p>
                <h2 className="memory-section-title">Запусти для лучшего вайба</h2>
                <p className="memory-section-copy">
                  Включай и лови тот самый форумный припев.
                </p>
              </div>
            </div>

            <MemoryTracksInteractive
              tracks={[forumVibeTrack]}
              theme="warm"
              className="memory-vibe-player"
            />
          </section>

          <section className="section-shell memory-shell memory-shell-participants memory-deferred-content space-y-6">
            <div className="space-y-2">
              <p className="memory-kicker">Все участники форума</p>
              <h2 className="memory-section-title">
                Люди, с которыми мы прожили эти дни
              </h2>
              <p className="memory-section-copy">
                Имена, лица и тёплые слова, которые остались с нами после форума.
              </p>
            </div>

            <div className="memory-sticker-stage">
              <MemoryParticipantStickers participants={participantStickers} />
            </div>
          </section>
        </div>
      </section>

      <section className="section-panel memory-panel memory-panel-story memory-deferred-panel pt-6 pb-10 md:pt-8 md:pb-14">
        <div className="section-inner">
          <section className="section-shell memory-shell memory-shell-curators space-y-6">
            <div className="memory-curators-headline space-y-2">
              <p className="memory-kicker memory-curators-kicker">Кураторы и команды</p>
              <h2 className="memory-section-title memory-curators-title">
                <span>Слова, которые греют</span>
                <span className="memory-curators-title-accent">и сегодня</span>
              </h2>
              <p className="memory-section-copy memory-curators-copy">
                Живые послания от тех, кто был рядом каждый день и делал форум по-настоящему семейным.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {curatorMemoryCards.map((card) => {
                const letterParagraphs = card.text
                  .split(/\n+/)
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <article key={card.id} className="glass-card memory-curator-card p-5 md:p-6">
                    <CuratorTeamOrbit
                      curatorName={card.curatorName}
                      curatorPhoto={curatorPhotoById[card.id]}
                      members={curatorTeamMembersById.get(card.id) ?? []}
                      memberPhotosByFullName={memoryParticipantPhotoByName}
                    />

                    <div className="memory-curator-letter">
                      <div className="memory-curator-letter-head">
                        <div className="space-y-1">
                          <p className="memory-curator-letter-team">{card.teamName}</p>
                          <h3 className="memory-curator-letter-author">{card.curatorName}</h3>
                        </div>
                        <span className="memory-curator-letter-pill">Послание куратора</span>
                      </div>

                      <div className="memory-curator-letter-body">
                        <span className="memory-curator-letter-quote" aria-hidden>
                          “
                        </span>
                        <div className="memory-curator-letter-scroll">
                          {letterParagraphs.map((paragraph, index) => (
                            <p key={`${card.id}-paragraph-${index}`} className="memory-curator-letter-paragraph">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      <section className="section-panel memory-panel memory-panel-playlist memory-deferred-panel pt-6 pb-10 md:pt-8 md:pb-14">
        <div className="section-inner">
          <section className="section-shell memory-shell memory-shell-playlist space-y-6">
            <div className="memory-playlist-headline">
              <div className="max-w-2xl space-y-2">
                <p className="memory-kicker">Музыка воспоминаний</p>
                <h2 className="memory-section-title">{memoryPlaylist.title}</h2>
                <p className="memory-section-copy">{memoryPlaylist.description}</p>
              </div>
            </div>

            <div className="memory-playlist-layout">
              <aside className="memory-spotify-card memory-spotify-card-expanded">
                <div className="memory-spotify-main">
                  <div className="memory-spotify-tracks-col">
                    <MemoryTracksInteractive
                      tracks={memoryPlaylist.tracks}
                      className="memory-spotify-tracks"
                    />
                  </div>

                  <div className="memory-spotify-right">
                    <div className="memory-spotify-head">
                      <p className="memory-spotify-kicker">Spotify playlist</p>
                      <h3 className="memory-spotify-title">{memoryPlaylist.spotifyTitle}</h3>
                    </div>

                    <article className="memory-dj-card memory-dj-card-featured memory-dj-card-remix">
                      <div className="memory-dj-photo">
                        <Image
                          src={assetPath("/images/people/featured/dj-ebulago.jpg")}
                          alt="Ваш диджей"
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </div>
                      <div className="memory-dj-meta">
                        <div className="memory-dj-headline">
                          <p className="memory-dj-kicker">Ваш диджей</p>
                          <span className="memory-dj-live-pill" aria-hidden>
                            <span className="memory-dj-live-pill-dot" />
                            On Air
                          </span>
                        </div>
                        <p className="memory-dj-name">
                          <span className="memory-dj-name-main">DJ Edublago</span>
                          <span className="memory-dj-name-sub">live set • forum vibes</span>
                        </p>
                        <div className="memory-dj-wave-mini" aria-hidden>
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="memory-dj-socials">
                          <a
                            href={djInstagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="memory-dj-social-link"
                            data-social="instagram"
                            aria-label="Instagram"
                          >
                            <InstagramIcon className="h-4 w-4" />
                            <span>Instagram</span>
                          </a>
                          <a
                            href={djTelegramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="memory-dj-social-link"
                            data-social="telegram"
                            aria-label="Telegram"
                          >
                            <TelegramIcon className="h-4 w-4" />
                            <span>Telegram</span>
                          </a>
                        </div>
                      </div>
                    </article>

                    <div className="memory-spotify-cover-wrap">
                      <div className="memory-spotify-cover">
                        <Image
                          src={assetPath(memoryPlaylist.spotifyAvatar)}
                          alt={memoryPlaylist.spotifyTitle}
                          fill
                          sizes="(max-width: 768px) 90vw, 420px"
                          className="memory-spotify-cover-image object-cover"
                        />
                      </div>
                    </div>

                    <p className="memory-spotify-note">Откроется в Spotify в новом окне</p>

                    <Button
                      href={memoryPlaylist.spotifyUrl}
                      variant="secondary"
                      className="memory-spotify-action"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Открыть в Spotify
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </section>

      <section className="section-panel memory-panel memory-panel-wishes memory-deferred-panel pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="section-inner">
          <div className="memory-shell memory-shell-wishes rounded-xl border border-border/60 p-1">
            <MemoryWishesSection />
          </div>
        </div>
      </section>

      <section className="section-panel memory-panel memory-panel-return memory-deferred-panel pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="section-inner">
          <section className="memory-shell memory-return-shell">
            <div className="memory-return-spark memory-return-spark-left" aria-hidden />
            <div className="memory-return-spark memory-return-spark-right" aria-hidden />
            <div className="memory-return-grid" aria-hidden />

            <div className="memory-return-inner">
              <p className="memory-return-kicker">Февраль 2026 • горы • форум</p>
              <h2 className="memory-return-title">Я вновь сюда вернусь</h2>
              <p className="memory-return-copy">
                Два кадра, в которых осталось всё самое тёплое: люди, снег, музыка и чувство команды.
              </p>

              <div className="memory-return-gallery">
                <article className="memory-return-card memory-return-card-left">
                  <div className="memory-return-card-shadow" aria-hidden />
                  <div className="memory-return-card-frame">
                    <div className="memory-return-photo-wrap">
                      <Image
                        src={assetPath("/images/memory/return/female-team-mountains.jpg")}
                        alt="Групповой кадр участниц форума на фоне гор"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="memory-return-photo"
                      />
                    </div>
                  </div>
                  <p className="memory-return-caption">Команда участниц</p>
                </article>

                <article className="memory-return-card memory-return-card-right">
                  <div className="memory-return-card-shadow" aria-hidden />
                  <div className="memory-return-card-frame">
                    <div className="memory-return-photo-wrap">
                      <Image
                        src={assetPath("/images/memory/return/male-team-mountains.jpg")}
                        alt="Групповой кадр участников форума на фоне гор"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="memory-return-photo"
                      />
                    </div>
                  </div>
                  <p className="memory-return-caption">Команда участников</p>
                </article>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="section-panel memory-panel memory-panel-anonymous memory-deferred-panel pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="section-inner">
          <div className="memory-shell memory-shell-anonymous rounded-xl border border-border/60 p-1">
            <MemoryAnonymousMessagesSection />
          </div>
        </div>
      </section>
    </div>
  );
}
