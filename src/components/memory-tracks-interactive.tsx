"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import type { MemoryTrack } from "@/data/memory";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/assets";

type MemoryTracksInteractiveProps = {
  tracks: MemoryTrack[];
  className?: string;
  theme?: "cool" | "warm";
};

type TrackClock = {
  current: number;
  duration: number;
};

const TIME_UPDATE_THROTTLE_MS = 120;
const WAVE_BARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const formatTime = (value: number): string => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/** Unique gradient per track for visual variety */
const TRACK_THEMES_COOL = [
  {
    pattern: "grid",
    from: "109 203 255",
    to: "42 118 224",
    glow: "151 226 255",
    ink: "20 64 130",
    stripe: "210 242 255",
    accent: "118 241 255",
    mesh: "196 236 255",
  },
  {
    pattern: "vinyl",
    from: "129 188 255",
    to: "68 109 221",
    glow: "175 217 255",
    ink: "29 66 138",
    stripe: "212 231 255",
    accent: "183 196 255",
    mesh: "197 220 255",
  },
  {
    pattern: "beats",
    from: "108 216 255",
    to: "42 150 224",
    glow: "167 238 255",
    ink: "22 82 141",
    stripe: "205 247 255",
    accent: "112 255 216",
    mesh: "179 247 226",
  },
  {
    pattern: "stereo",
    from: "143 201 255",
    to: "75 121 219",
    glow: "187 223 255",
    ink: "33 71 139",
    stripe: "218 236 255",
    accent: "147 180 255",
    mesh: "198 221 255",
  },
  {
    pattern: "spark",
    from: "116 220 250",
    to: "53 138 223",
    glow: "174 239 255",
    ink: "25 79 139",
    stripe: "207 246 255",
    accent: "140 250 205",
    mesh: "177 248 229",
  },
] as const;

const TRACK_THEMES_WARM = [
  {
    pattern: "grid",
    from: "255 198 142",
    to: "230 132 86",
    glow: "255 183 117",
    ink: "92 45 28",
    stripe: "255 229 194",
    accent: "255 199 149",
    mesh: "255 220 182",
  },
  {
    pattern: "vinyl",
    from: "247 184 121",
    to: "218 116 78",
    glow: "249 173 109",
    ink: "95 46 29",
    stripe: "255 226 186",
    accent: "245 197 140",
    mesh: "255 218 179",
  },
  {
    pattern: "beats",
    from: "255 203 153",
    to: "221 126 81",
    glow: "255 186 122",
    ink: "96 47 30",
    stripe: "255 232 198",
    accent: "255 193 140",
    mesh: "255 225 188",
  },
  {
    pattern: "stereo",
    from: "248 191 132",
    to: "211 113 74",
    glow: "244 172 112",
    ink: "93 44 27",
    stripe: "255 224 185",
    accent: "242 187 133",
    mesh: "255 216 178",
  },
  {
    pattern: "spark",
    from: "255 210 160",
    to: "229 132 86",
    glow: "255 188 126",
    ink: "97 49 31",
    stripe: "255 235 205",
    accent: "255 205 161",
    mesh: "255 228 196",
  },
] as const;

export function MemoryTracksInteractive({ tracks, className, theme = "cool" }: MemoryTracksInteractiveProps) {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const lastClockUpdateAtRef = useRef<Record<string, number>>({});
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [clock, setClock] = useState<Record<string, TrackClock>>({});
  const trackThemes = theme === "warm" ? TRACK_THEMES_WARM : TRACK_THEMES_COOL;

  const updateClock = (trackId: string, next: Partial<TrackClock>) => {
    setClock((prev) => {
      const current = prev[trackId] ?? { current: 0, duration: 0 };
      const merged = {
        current: next.current ?? current.current,
        duration: next.duration ?? current.duration,
      };

      if (merged.current === current.current && merged.duration === current.duration) {
        return prev;
      }

      return {
        ...prev,
        [trackId]: merged,
      };
    });
  };

  const pauseTrack = (trackId: string, resetPosition = false) => {
    const audio = audioRefs.current[trackId];
    if (!audio) {
      return;
    }

    audio.pause();
    if (resetPosition) {
      audio.currentTime = 0;
      updateClock(trackId, { current: 0 });
    }
  };

  const playTrack = async (trackId: string) => {
    const audio = audioRefs.current[trackId];
    if (!audio) {
      return;
    }

    if (activeTrackId && activeTrackId !== trackId) {
      pauseTrack(activeTrackId, true);
    }

    if (audio.ended) {
      audio.currentTime = 0;
    }

    try {
      await audio.play();
      setActiveTrackId(trackId);
    } catch {
      setActiveTrackId(null);
    }
  };

  const toggleTrack = async (trackId: string) => {
    const audio = audioRefs.current[trackId];
    if (!audio) {
      return;
    }

    if (activeTrackId === trackId && !audio.paused) {
      pauseTrack(trackId);
      setActiveTrackId(null);
      return;
    }

    await playTrack(trackId);
  };

  return (
    <div className={cn("memory-playlist-left memory-tracks-remix", className)}>
      {tracks.map((track, index) => {
        const trackClock = clock[track.id];
        const duration = trackClock?.duration ?? 0;
        const current = trackClock?.current ?? 0;
        const progress = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
        const isActive = activeTrackId === track.id;
        const trackTheme = trackThemes[index % trackThemes.length];

        return (
          <article
            key={track.id}
            className={cn(
              "memory-track-remix-card",
              isActive && "is-active",
            )}
            data-pattern={trackTheme.pattern}
            style={
              {
                "--memory-remix-progress": `${progress}%`,
                "--memory-remix-order": `${index}`,
                "--memory-remix-from": trackTheme.from,
                "--memory-remix-to": trackTheme.to,
                "--memory-remix-glow": trackTheme.glow,
                "--memory-remix-ink": trackTheme.ink,
                "--memory-remix-stripe": trackTheme.stripe,
                "--memory-remix-accent": trackTheme.accent,
                "--memory-remix-mesh": trackTheme.mesh,
                "--memory-remix-tilt": index % 2 === 0 ? "-0.65deg" : "0.65deg",
              } as CSSProperties
            }
          >
            <div className="memory-track-remix-cover-wrap">
              <div className="memory-track-remix-cover">
                <Image
                  src={assetPath(track.coverSrc)}
                  alt={`Обложка трека ${track.title}`}
                  fill
                  sizes="64px"
                  className="memory-track-remix-cover-image object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <button
                type="button"
                onClick={() => toggleTrack(track.id)}
                className={cn(
                  "memory-track-remix-play",
                  isActive && "is-playing",
                )}
                aria-label={isActive ? `Пауза: ${track.title}` : `Включить: ${track.title}`}
                aria-pressed={isActive}
              >
                <span className="memory-track-remix-play-icon" aria-hidden />
              </button>
            </div>

            <div className="memory-track-remix-main">
              <div className="memory-track-remix-meta">
                <h3 className="memory-track-remix-title">{track.title}</h3>
                <p className="memory-track-remix-artist">{track.artist}</p>
              </div>

              <div className="memory-track-remix-wave" aria-hidden>
                {WAVE_BARS.map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "memory-track-remix-wave-bar",
                      isActive && "is-active",
                    )}
                    style={
                      {
                        "--memory-wave-delay": `${i * 0.09}s`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>

              <div className="memory-track-remix-bottom">
                <div className="memory-track-remix-progress">
                  <span
                    className="memory-track-remix-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="memory-track-remix-time">
                  {formatTime(current)} / {duration > 0 ? formatTime(duration) : track.durationLabel}
                </p>
              </div>
            </div>

            <div className="memory-track-remix-reels" aria-hidden>
              <span className={cn("memory-track-remix-reel", isActive && "is-spinning")} />
              <span className={cn("memory-track-remix-reel", isActive && "is-spinning")} />
            </div>

            <audio
              ref={(node) => {
                audioRefs.current[track.id] = node;
              }}
              src={assetPath(track.audioSrc)}
              preload="none"
              onLoadedMetadata={(event) => {
                updateClock(track.id, { duration: event.currentTarget.duration || 0 });
              }}
              onTimeUpdate={(event) => {
                const now = performance.now();
                const lastUpdateAt = lastClockUpdateAtRef.current[track.id] ?? 0;

                if (now - lastUpdateAt < TIME_UPDATE_THROTTLE_MS) {
                  return;
                }

                lastClockUpdateAtRef.current[track.id] = now;
                updateClock(track.id, { current: event.currentTarget.currentTime });
              }}
              onPlay={() => {
                setActiveTrackId(track.id);
              }}
              onPause={() => {
                updateClock(track.id, { current: audioRefs.current[track.id]?.currentTime ?? 0 });
                setActiveTrackId((currentTrack) => (currentTrack === track.id ? null : currentTrack));
              }}
              onEnded={() => {
                lastClockUpdateAtRef.current[track.id] = 0;
                setActiveTrackId((currentTrack) => (currentTrack === track.id ? null : currentTrack));
                updateClock(track.id, { current: 0 });
              }}
            />
          </article>
        );
      })}
    </div>
  );
}
