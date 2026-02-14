"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/cn";

type MemoryParticipantSticker = {
  id: string;
  shortName: string;
  feedback: string;
  photo: string;
};

type MemoryParticipantStickersProps = {
  participants: MemoryParticipantSticker[];
};

export function MemoryParticipantStickers({ participants }: MemoryParticipantStickersProps) {
  const [activeSticker, setActiveSticker] = useState<MemoryParticipantSticker | null>(null);
  const [isTruncatedById, setIsTruncatedById] = useState<Record<string, boolean>>({});
  const [brokenPhotoById, setBrokenPhotoById] = useState<Record<string, boolean>>({});
  const feedbackRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const initialsById = useMemo(() => {
    return participants.reduce<Record<string, string>>((acc, participant) => {
      const initials = participant.shortName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
      acc[participant.id] = initials || "У";
      return acc;
    }, {});
  }, [participants]);

  const measureTruncation = useCallback(() => {
    const nextState: Record<string, boolean> = {};
    for (const participant of participants) {
      const element = feedbackRefs.current[participant.id];
      if (!element || !participant.feedback.trim()) {
        nextState[participant.id] = false;
        continue;
      }
      const heightOverflow = element.scrollHeight - element.clientHeight > 1;
      const widthOverflow = element.scrollWidth - element.clientWidth > 1;
      const likelyLongText = participant.feedback.trim().length > 140;
      nextState[participant.id] = heightOverflow || widthOverflow || likelyLongText;
    }
    setIsTruncatedById((previous) => {
      const prevKeys = Object.keys(previous);
      const nextKeys = Object.keys(nextState);
      if (prevKeys.length !== nextKeys.length) {
        return nextState;
      }
      for (const key of nextKeys) {
        if (previous[key] !== nextState[key]) {
          return nextState;
        }
      }
      return previous;
    });
  }, [participants]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(measureTruncation);
    window.addEventListener("resize", measureTruncation);
    if ("fonts" in document) {
      void document.fonts.ready.then(() => {
        measureTruncation();
      });
    }

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        measureTruncation();
      });
      Object.values(feedbackRefs.current).forEach((element) => {
        if (element) {
          observer?.observe(element);
        }
      });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureTruncation);
      observer?.disconnect();
    };
  }, [measureTruncation]);

  useEffect(() => {
    if (!activeSticker) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSticker(null);
      }
    };

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeSticker]);

  const setFeedbackRef = useCallback((id: string, node: HTMLSpanElement | null) => {
    feedbackRefs.current[id] = node;
  }, []);

  const markPhotoBroken = useCallback((id: string) => {
    setBrokenPhotoById((previous) => {
      if (previous[id]) {
        return previous;
      }
      return { ...previous, [id]: true };
    });
  }, []);

  return (
    <>
      <div className="memory-sticker-board">
        <div className="memory-sticker-start" aria-hidden>
          <span className="memory-sticker-start-dot" />
          <span className="memory-sticker-start-dot" />
          <span className="memory-sticker-start-dot" />
        </div>

        <div className="memory-sticker-grid">
          {participants.map((participant, index) => (
            <article
              key={participant.id}
              className={cn(
                "memory-sticker",
                index % 3 === 1 && "memory-sticker-v2",
                index % 3 === 2 && "memory-sticker-v3",
                index % 4 === 3 && "memory-sticker-v4",
                index % 5 === 4 && "memory-sticker-v5",
              )}
            >
              <div className="memory-sticker-tab" aria-hidden />
              <div className="memory-sticker-photo-shell">
                <div className="memory-sticker-photo">
                  <Image
                    src={assetPath(participant.photo)}
                    alt={participant.shortName}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 220px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="memory-sticker-content">
                <h3 className="memory-sticker-name">{participant.shortName}</h3>
                <p className="memory-sticker-feedback">
                  <span className="memory-sticker-quote" aria-hidden>
                    “
                  </span>
                  <span
                    className="memory-sticker-feedback-text"
                    ref={(node) => setFeedbackRef(participant.id, node)}
                  >
                    {participant.feedback}
                  </span>
                </p>
                {isTruncatedById[participant.id] && (
                  <button
                    type="button"
                    className="memory-sticker-read-more"
                    onClick={() => setActiveSticker(participant)}
                    aria-haspopup="dialog"
                    aria-label={`Читать отзыв полностью: ${participant.shortName}`}
                  >
                    Читать полностью
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeSticker &&
        createPortal(
          <div
            className="memory-sticker-modal"
            role="presentation"
            onClick={() => setActiveSticker(null)}
          >
            <div
              className="memory-sticker-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="memory-sticker-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="memory-sticker-modal-close"
                onClick={() => setActiveSticker(null)}
                aria-label="Закрыть полный отзыв"
              >
                Закрыть
              </button>

              <div className="memory-sticker-modal-head">
                <div className="memory-sticker-modal-photo">
                  {brokenPhotoById[activeSticker.id] || !activeSticker.photo ? (
                    <span className="memory-sticker-modal-photo-fallback">
                      {initialsById[activeSticker.id]}
                    </span>
                  ) : (
                    <Image
                      src={assetPath(activeSticker.photo)}
                      alt={activeSticker.shortName}
                      fill
                      sizes="68px"
                      className="object-cover"
                      onError={() => markPhotoBroken(activeSticker.id)}
                    />
                  )}
                </div>
                <h3 id="memory-sticker-modal-title" className="memory-sticker-modal-name">
                  {activeSticker.shortName}
                </h3>
              </div>

              <p className="memory-sticker-modal-text">{activeSticker.feedback}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
