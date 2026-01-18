"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./power-points.module.css";

type CardData = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const cards: CardData[] = [
  {
    id: "c1",
    number: "01",
    title: "Каникулы с пользой",
    description: "Пять дней активности, где ты быстро находишь свой ритм.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: "c2",
    number: "02",
    title: "Новые связи",
    description: "Друзья, с которыми вы вместе будете учиться и отдыхать.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "c3",
    number: "03",
    title: "Командные форматы",
    description: "Квесты, игры и задания, которые сближают и раскрывают.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "c4",
    number: "04",
    title: "Порог неба",
    description: "Горы, чистый воздух и атмосферный старт студенческой жизни.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
      </svg>
    ),
  },
  {
    id: "c5",
    number: "05",
    title: "Наставники рядом",
    description: "Кураторы и спикеры помогут и зададут верный вектор.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5c0 4-5 9-5 9s-5-5-5-9a5 5 0 0 1 5-5z" />
        <circle cx="12" cy="7" r="2" />
        <path d="M8 22h8" />
        <path d="M12 17v5" />
      </svg>
    ),
  },
  {
    id: "c6",
    number: "06",
    title: "Энергия форума",
    description: "Твои первые громкие впечатления в университете.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export const PowerPoints = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const radiusX = 420; // horizontal radius
  const radiusY = 150; // vertical radius (depth)
  const speed = 0.0002; // rotation speed

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const handleMobileScroll = () => {
    if (!mobileContainerRef.current) return;
    const container = mobileContainerRef.current;
    
    // Calculate center of container
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    
    // Find the card closest to the center
    // We assume the children of mobileContainer are the cards
    const cardElements = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Infinity;

    cardElements.forEach((card, index) => {
      // offsetLeft is relative to the scroll parent if positioned, 
      // but here we just need relative position in the track
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== mobileActiveIndex) {
      setMobileActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Animation loop
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      
      // Calculate delta only if not paused
      if (!hoveredCardId && !activeCardId) {
        setRotationOffset((prev) => (prev + speed * 16) % (2 * Math.PI)); // Assume ~60fps, 16ms frame
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [hoveredCardId, activeCardId, speed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setMousePos({ x: 0, y: 0 });
  };

  const handleCardClick = (id: string) => {
    if (activeCardId === id) {
      setActiveCardId(null);
    } else {
      setActiveCardId(id);
    }
  };

  const calculatePosition = (index: number, total: number) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = angleStep * index + rotationOffset;
    
    // Position on ellipse
    const rawX = Math.cos(angle) * radiusX;
    const rawY = Math.sin(angle) * radiusY;
    
    // Scale based on Y (depth)
    // y goes from -radiusY (back) to +radiusY (front)
    // Scale: 0.8 at back, 1.0 at front
    const rawScale = 0.8 + ((rawY + radiusY) / (2 * radiusY)) * 0.2;
    
    // Opacity/Blur based on Y
    // Opacity: 0.6 at back, 1 at front
    const rawOpacity = 0.6 + ((rawY + radiusY) / (2 * radiusY)) * 0.4;
    // Z-index based on Y
    const zIndex = Math.floor(rawY + radiusY);

    // Round values to avoid hydration mismatch
    const x = Number(rawX.toFixed(2));
    const y = Number(rawY.toFixed(2));
    const scale = Number(rawScale.toFixed(3));
    const opacity = Number(rawOpacity.toFixed(3));

    return { x, y, scale, opacity, zIndex };
  };

  const activeOrHoveredId = activeCardId || hoveredCardId;
  let connectionLine = null;

  if (activeOrHoveredId) {
    const index = cards.findIndex(c => c.id === activeOrHoveredId);
    if (index !== -1) {
      const pos = calculatePosition(index, cards.length);
      connectionLine = (
        <svg 
          className="absolute left-1/2 top-1/2 w-0 h-0 overflow-visible" 
          style={{ 
            zIndex: pos.zIndex - 1,
            pointerEvents: 'none' 
          }}
        >
          <line 
            x1="0" 
            y1="0" 
            x2={pos.x} 
            y2={pos.y} 
            stroke="rgb(var(--primary))" 
            strokeWidth="2" 
            strokeOpacity="0.5"
            strokeDasharray="4 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1s" repeatCount="indefinite" />
          </line>
          <circle 
            cx="0" 
            cy="0" 
            r="4" 
            fill="rgb(var(--primary))"
          >
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle 
            cx={pos.x} 
            cy={pos.y} 
            r="3" 
            fill="rgb(var(--primary))"
          />
        </svg>
      );
    }
  }

  return (
    <section ref={sectionRef} className="section-panel panel-glow" aria-label="Точки силы">
      <div className="section-inner">
        <div className={styles.container}>
        <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <p className={styles.eyebrow}>Почему СтудСтарт</p>
          <h2 className={styles.title}>Точки силы</h2>
          <p className={styles.subtitle}>
            Всё, что нужно первокурснику, чтобы почувствовать уверенность и поддержку в новом городе.
          </p>
        </div>

        {/* Desktop Orbital System */}
        <div 
          ref={wrapperRef}
          className={`hidden md:block transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClickCapture={(e) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-orbit-card="true"]')) {
              setActiveCardId(null);
            }
          }}
          style={{ perspective: "1000px" }}
        >
          <div 
            className={styles.orbitSystem}
            style={{
              transform: `rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`
            }}
          >
            {/* Orbital Track Visuals */}
            <div className={styles.orbitTrack} />
            
            {connectionLine}
            
            {/* Central Core */}
            <div className={`${styles.core} ${activeOrHoveredId ? styles.coreActive : ''}`}>
              <div className={styles.coreBg} />
              <div className={styles.coreRingOuter} />
              <div className={styles.coreRingInner} />
              <span className={styles.coreText}>СтудСтарт</span>
            </div>

            {/* Orbiting Cards */}
            {cards.map((card, index) => {
              const pos = calculatePosition(index, cards.length);
              const isSelected = activeCardId === card.id;
              const isHoveredCard = hoveredCardId === card.id;
              
              const finalScale = isSelected ? 1.1 : (isHoveredCard ? 1.05 : pos.scale);
              const finalZIndex = isSelected || isHoveredCard ? 1000 : pos.zIndex;
              const finalOpacity = isSelected || isHoveredCard ? 1 : pos.opacity;
              const blur = (isSelected || isHoveredCard) ? '0px' : (pos.y < 0 ? '2px' : '0px'); 

              return (
                <div
                  key={card.id}
                  className={`${styles.card} ${isSelected ? styles.selected : ''}`}
                  data-orbit-card="true"
                  style={{
                    transform: `translate3d(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px), 0) scale(${finalScale})`,
                    zIndex: finalZIndex,
                    opacity: finalOpacity,
                    filter: `blur(${blur})`,
                  }}
                  onClick={() => handleCardClick(card.id)}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(card.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${card.title}. ${card.description}`}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      {card.icon}
                    </div>
                    <span className={styles.cardNumber}>{card.number}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>

          {/* Mobile Carousel View */}
          <div className={styles.mobileCarouselWrapper}>
            <div 
              ref={mobileContainerRef}
              className={styles.mobileTrack}
              onScroll={handleMobileScroll}
            >
              {cards.map((card, index) => {
                const isActive = index === mobileActiveIndex;
                return (
                  <div 
                    key={card.id} 
                    className={`${styles.mobileCard} ${isActive ? styles.mobileCardActive : ''}`}
                  >
                    <div className={styles.mobileCardInner}>
                      <div className={styles.mobileCardHeader}>
                        <div className={styles.mobileCardIcon}>
                          {card.icon}
                        </div>
                        <span className={styles.mobileCardNumber}>{card.number}</span>
                      </div>
                      <h3 className={styles.mobileCardTitle}>{card.title}</h3>
                      <p className={styles.mobileCardDescription}>{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Pagination Dots */}
            <div className={styles.mobileIndicators}>
              {cards.map((_, index) => (
                <div 
                  key={index}
                  className={`${styles.mobileDot} ${index === mobileActiveIndex ? styles.mobileDotActive : ''}`}
                  onClick={() => {
                    if (mobileContainerRef.current) {
                      const card = mobileContainerRef.current.children[index] as HTMLElement;
                      if (card) {
                        mobileContainerRef.current.scrollTo({
                          left: card.offsetLeft - (mobileContainerRef.current.clientWidth - card.clientWidth) / 2,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
