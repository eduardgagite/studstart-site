"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { memoryWishes } from "@/data/memory";
import { assetPath } from "@/lib/assets";

type Offset = {
  x: number;
  y: number;
};

type Bounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

type WishLayout = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  x: number;
  y: number;
  rotate: number;
};

const NOTE_WIDTH = 152;
const NOTE_HEIGHT = 152;
const DRAG_STEP = 180;
const SCALE_MIN = 0.72;
const SCALE_MAX = 1.55;
const SCALE_STEP = 0.12;
const NOTE_GAP = 12;
const BANNER_BOARD_WIDTH = 2400;
const BANNER_BOARD_HEIGHT = 1440;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const roundTo = (value: number, decimals: number) => Number(value.toFixed(decimals));
const fixed = (value: number, decimals: number) => value.toFixed(decimals);

const getWishMeta = (author?: string, role?: string) => {
  const meta = [author, role].filter(Boolean).join(" • ");
  return meta || "";
};

const getNoise = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const getBounds = (
  viewportWidth: number,
  viewportHeight: number,
  boardWidth: number,
  boardHeight: number,
): Bounds => {
  const centeredX = (viewportWidth - boardWidth) / 2;
  const centeredY = (viewportHeight - boardHeight) / 2;

  return {
    minX: viewportWidth >= boardWidth ? centeredX : viewportWidth - boardWidth,
    maxX: viewportWidth >= boardWidth ? centeredX : 0,
    minY: viewportHeight >= boardHeight ? centeredY : viewportHeight - boardHeight,
    maxY: viewportHeight >= boardHeight ? centeredY : 0,
  };
};

const clampOffset = (offset: Offset, bounds: Bounds): Offset => ({
  x: clamp(offset.x, bounds.minX, bounds.maxX),
  y: clamp(offset.y, bounds.minY, bounds.maxY),
});

export function MemoryWishesSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const boundsRef = useRef<Bounds>({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const rafOffsetFrameRef = useRef<number | null>(null);
  const pendingOffsetRef = useRef<Offset | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const viewportStyle = useMemo(
    () => ({
      "--memory-wishes-banner-image": `url("${assetPath("/images/memory/wishes-board-bg.jpg")}")`,
    }) as CSSProperties,
    [],
  );
  const boardWishes = useMemo(() => {
    return memoryWishes.filter((wish) => Boolean(wish.imageSrc));
  }, []);

  const boardLayout = useMemo(() => {
    const paddingX = 58;
    const paddingY = 56;
    const boardWidth = BANNER_BOARD_WIDTH;
    const boardHeight = BANNER_BOARD_HEIGHT;
    const minX = paddingX;
    const maxX = boardWidth - NOTE_WIDTH - paddingX;
    const minY = paddingY;
    const maxY = boardHeight - NOTE_HEIGHT - paddingY;

    const wishesCount = boardWishes.length;
    const safeCount = Math.max(1, wishesCount);
    const usableWidth = boardWidth - paddingX * 2;
    const usableHeight = boardHeight - paddingY * 2;
    const boardAspect = usableWidth / Math.max(1, usableHeight);
    const columns = Math.max(1, Math.ceil(Math.sqrt(safeCount * boardAspect)));
    const rows = Math.max(1, Math.ceil(safeCount / columns));
    const cellWidth = usableWidth / columns;
    const cellHeight = usableHeight / rows;
    const maxJitterX = Math.max(0, (cellWidth - NOTE_WIDTH - NOTE_GAP) * 0.92);
    const maxJitterY = Math.max(0, (cellHeight - NOTE_HEIGHT - NOTE_GAP) * 0.92);

    const slots = Array.from({ length: rows * columns }, (_, slotIndex) => {
      const col = slotIndex % columns;
      const row = Math.floor(slotIndex / columns);
      const slotBaseX = paddingX + col * cellWidth + (cellWidth - NOTE_WIDTH) / 2;
      const slotBaseY = paddingY + row * cellHeight + (cellHeight - NOTE_HEIGHT) / 2;
      const jitterX = (getNoise((slotIndex + 1) * 17.31 + safeCount * 0.73) - 0.5) * maxJitterX;
      const jitterY = (getNoise((slotIndex + 1) * 23.57 + safeCount * 0.91) - 0.5) * maxJitterY;
      const x = roundTo(clamp(slotBaseX + jitterX, minX, maxX), 6);
      const y = roundTo(clamp(slotBaseY + jitterY, minY, maxY), 6);
      const weight = getNoise((slotIndex + 1) * 41.7 + (row + 1) * 13.3 + (col + 1) * 7.1);

      return { x, y, weight };
    }).sort((a, b) => a.weight - b.weight);

    const finalPositions = boardWishes.map((_, index) => {
      const slot = slots[index] ?? slots[index % slots.length];
      return slot ? { x: slot.x, y: slot.y } : { x: paddingX, y: paddingY };
    });

    const wishes: WishLayout[] = boardWishes.map((wish, index) => {
      const point = finalPositions[index] ?? { x: paddingX, y: paddingY };
      const rawRotate = (
        getNoise((index + 1) * 73.5 + point.x * 0.017 + point.y * 0.013) - 0.5
      ) * 18;
      const rotate = Math.abs(rawRotate) < 1.4
        ? (rawRotate < 0 ? -2.2 : 2.2)
        : Number(rawRotate.toFixed(1));
      const fallbackMeta = getWishMeta(wish.author, wish.role);

      return {
        id: wish.id,
        imageSrc: wish.imageSrc || "",
        imageAlt: wish.imageAlt || fallbackMeta || "Пожелание участника",
        x: point.x,
        y: point.y,
        rotate,
      };
    });

    return {
      boardWidth,
      boardHeight,
      wishes,
    };
  }, [boardWishes]);

  const bounds = useMemo(
    () => getBounds(
      viewportSize.width,
      viewportSize.height,
      boardLayout.boardWidth * scale,
      boardLayout.boardHeight * scale,
    ),
    [boardLayout.boardHeight, boardLayout.boardWidth, scale, viewportSize.height, viewportSize.width],
  );

  const centeredOffset = useMemo(
    () => clampOffset({
      x: (viewportSize.width - boardLayout.boardWidth * scale) / 2,
      y: (viewportSize.height - boardLayout.boardHeight * scale) / 2,
    }, bounds),
    [boardLayout.boardHeight, boardLayout.boardWidth, bounds, scale, viewportSize.height, viewportSize.width],
  );

  const resolvedOffset = useMemo(
    () => (hasInteracted ? clampOffset(offset, bounds) : centeredOffset),
    [bounds, centeredOffset, hasInteracted, offset],
  );

  const getViewportDimensions = (node?: HTMLDivElement | null) => {
    const target = node ?? viewportRef.current;
    return {
      width: target?.clientWidth ?? viewportSize.width,
      height: target?.clientHeight ?? viewportSize.height,
    };
  };

  const getBoundsForScale = (nextScale: number, width: number, height: number) =>
    getBounds(
      width,
      height,
      boardLayout.boardWidth * nextScale,
      boardLayout.boardHeight * nextScale,
    );

  const centerFor = (nextScale: number, width: number, height: number, nextBounds: Bounds) =>
    clampOffset({
      x: (width - boardLayout.boardWidth * nextScale) / 2,
      y: (height - boardLayout.boardHeight * nextScale) / 2,
    }, nextBounds);

  const cancelScheduledOffset = useCallback(() => {
    if (rafOffsetFrameRef.current !== null) {
      cancelAnimationFrame(rafOffsetFrameRef.current);
      rafOffsetFrameRef.current = null;
    }
    pendingOffsetRef.current = null;
  }, []);

  const scheduleOffsetUpdate = useCallback((nextOffset: Offset) => {
    pendingOffsetRef.current = nextOffset;

    if (rafOffsetFrameRef.current !== null) {
      return;
    }

    rafOffsetFrameRef.current = window.requestAnimationFrame(() => {
      rafOffsetFrameRef.current = null;
      const pendingOffset = pendingOffsetRef.current;

      if (!pendingOffset) {
        return;
      }

      setOffset((current) => (
        current.x === pendingOffset.x && current.y === pendingOffset.y
          ? current
          : pendingOffset
      ));
    });
  }, []);

  useEffect(() => {
    boundsRef.current = bounds;
  }, [bounds]);

  useEffect(() => {
    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return undefined;
    }

    const updateSize = () => {
      const rect = viewportElement.getBoundingClientRect();
      setViewportSize({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(viewportElement);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => () => cancelScheduledOffset(), [cancelScheduledOffset]);

  const moveBy = (deltaX: number, deltaY: number) => {
    cancelScheduledOffset();
    setHasInteracted(true);
    const viewport = getViewportDimensions();
    const liveBounds = getBoundsForScale(scale, viewport.width, viewport.height);
    const liveCentered = clampOffset({
      x: (viewport.width - boardLayout.boardWidth * scale) / 2,
      y: (viewport.height - boardLayout.boardHeight * scale) / 2,
    }, liveBounds);
    boundsRef.current = liveBounds;

    setOffset((current) => {
      const base = hasInteracted ? clampOffset(current, liveBounds) : liveCentered;
      return clampOffset({ x: base.x + deltaX, y: base.y + deltaY }, liveBounds);
    });
  };

  const zoomTo = (nextScale: number) => {
    cancelScheduledOffset();
    const viewport = getViewportDimensions();

    if (!viewport.width || !viewport.height) {
      return;
    }

    const clampedScale = clamp(nextScale, SCALE_MIN, SCALE_MAX);
    const currentScale = scale;

    if (Math.abs(clampedScale - currentScale) < 0.001) {
      return;
    }

    const anchorX = viewport.width / 2;
    const anchorY = viewport.height / 2;
    const currentBounds = getBoundsForScale(currentScale, viewport.width, viewport.height);
    const centeredAtCurrent = centerFor(currentScale, viewport.width, viewport.height, currentBounds);
    const baseOffset = hasInteracted ? clampOffset(resolvedOffset, currentBounds) : centeredAtCurrent;
    const worldX = (anchorX - baseOffset.x) / currentScale;
    const worldY = (anchorY - baseOffset.y) / currentScale;
    const nextBounds = getBoundsForScale(clampedScale, viewport.width, viewport.height);
    const nextOffset = clampOffset({
      x: anchorX - worldX * clampedScale,
      y: anchorY - worldY * clampedScale,
    }, nextBounds);

    setScale(clampedScale);
    boundsRef.current = nextBounds;
    setHasInteracted(true);
    setOffset(nextOffset);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffsetX: resolvedOffset.x,
      startOffsetY: resolvedOffset.y,
    };
    setHasInteracted(true);
    setIsDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const nextOffset = {
      x: dragState.startOffsetX + (event.clientX - dragState.startX),
      y: dragState.startOffsetY + (event.clientY - dragState.startY),
    };
    const liveBounds = getBoundsForScale(
      scale,
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight,
    );
    boundsRef.current = liveBounds;

    scheduleOffsetUpdate(clampOffset(nextOffset, liveBounds));
  };

  const onPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const boardStyle = useMemo(
    () => ({
      width: `${boardLayout.boardWidth}px`,
      height: `${boardLayout.boardHeight}px`,
      transform: `translate3d(${fixed(resolvedOffset.x, 6)}px, ${fixed(resolvedOffset.y, 6)}px, 0px) scale(${fixed(scale, 4)})`,
      transformOrigin: "top left",
      transition: isDragging ? "none" : "transform 280ms ease-out",
    }) satisfies CSSProperties,
    [boardLayout.boardHeight, boardLayout.boardWidth, isDragging, resolvedOffset.x, resolvedOffset.y, scale],
  );

  const renderedWishNotes = useMemo(
    () => boardLayout.wishes.map((wish, index) => (
      <article
        key={wish.id}
        className={`memory-wish-note memory-wish-note-image memory-wish-note-tape-${(index % 3) + 1}`}
        style={{
          transform: `translate3d(${fixed(wish.x, 6)}px, ${fixed(wish.y, 6)}px, 0px) rotate(${fixed(wish.rotate, 1)}deg)`,
        }}
      >
        <div className="memory-wish-note-photo-shell">
          <Image
            src={assetPath(wish.imageSrc)}
            alt={wish.imageAlt}
            fill
            sizes="(max-width: 768px) 138px, 152px"
            className="memory-wish-note-photo object-contain"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>
      </article>
    )),
    [boardLayout.wishes],
  );

  if (boardWishes.length === 0) {
    return (
      <section className="section-shell memory-wishes-shell space-y-6">
        <div className="space-y-2">
          <p className="section-eyebrow">Пожелания будущим участникам</p>
          <h2 className="text-2xl font-semibold md:text-3xl">Теплые слова от СтудСтарта 2026</h2>
        </div>

        <div className="glass-card border-dashed p-8 text-center">
          <p className="text-base font-semibold">Пока нет фото-стикеров.</p>
          <p className="mt-2 text-sm text-muted">Добавь изображения в `memoryWishes`, и они появятся на баннере.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell memory-wishes-shell space-y-6">
      <div className="memory-wishes-head">
        <div className="space-y-3">
          <p className="section-eyebrow">Пожелания будущим участникам</p>
          <h2 className="text-2xl font-semibold md:text-3xl">Теплые слова от СтудСтарта 2026</h2>
          <p className="memory-wishes-helper">Перетаскивай поле мышью или свайпом, чтобы смотреть все записки.</p>
        </div>
      </div>

      <div className="memory-wishes-stage">
        <aside className="memory-wishes-controls-shell" aria-label="Навигация по доске пожеланий">
          <div className="memory-wishes-zoom">
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-zoom"
              onClick={() => zoomTo(scale - SCALE_STEP)}
              aria-label="Отдалить камеру"
            >
              −
            </button>
            <span className="memory-wishes-zoom-readout">{Math.round(scale * 100)}%</span>
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-zoom"
              onClick={() => zoomTo(scale + SCALE_STEP)}
              aria-label="Приблизить камеру"
            >
              +
            </button>
          </div>

          <div className="memory-wishes-controls">
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-up"
              onClick={() => moveBy(0, DRAG_STEP)}
              aria-label="Сдвинуть поле вверх"
            >
              ↑
            </button>
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-left"
              onClick={() => moveBy(DRAG_STEP, 0)}
              aria-label="Сдвинуть поле влево"
            >
              ←
            </button>
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-center"
              onClick={() => {
                cancelScheduledOffset();
                const viewport = getViewportDimensions();
                const liveBounds = getBoundsForScale(1, viewport.width, viewport.height);
                const liveCentered = centerFor(1, viewport.width, viewport.height, liveBounds);
                setHasInteracted(false);
                setScale(1);
                boundsRef.current = liveBounds;
                setOffset(liveCentered);
              }}
              aria-label="Вернуть в центр"
            >
              ⊙
            </button>
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-right"
              onClick={() => moveBy(-DRAG_STEP, 0)}
              aria-label="Сдвинуть поле вправо"
            >
              →
            </button>
            <button
              type="button"
              className="memory-wishes-control memory-wishes-control-down"
              onClick={() => moveBy(0, -DRAG_STEP)}
              aria-label="Сдвинуть поле вниз"
            >
              ↓
            </button>
          </div>
        </aside>

        <div
          ref={viewportRef}
          className="memory-wishes-viewport"
          style={viewportStyle}
          onDragStart={(event) => event.preventDefault()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          <div
            className="memory-wishes-board"
            style={boardStyle}
          >
            {renderedWishNotes}
          </div>
        </div>
      </div>
    </section>
  );
}
