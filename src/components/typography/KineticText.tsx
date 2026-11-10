import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { TypographyAnimation } from "../../types/schema";

interface KineticTextProps {
  text: string;
  animation?: TypographyAnimation;
  highlightWords?: string[];
  accentColor?: string;
  className?: string;
  delayFrames?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  style?: React.CSSProperties;
}

export const KineticText: React.FC<KineticTextProps> = ({ text, animation = "pop-in", highlightWords = [], accentColor = "#10b981", className = "", delayFrames = 0, as = "h1", style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeFrame = Math.max(0, frame - delayFrames);

  const normalizedHighlights = highlightWords.map((w) => w.toLowerCase().trim());
  const words = text.split(" ");

  // 1. Pop-in Animation
  if (animation === "pop-in") {
    const textSpring = spring({
      frame: activeFrame,
      fps,
      config: {
        damping: 12,
        stiffness: 120,
        mass: 0.8,
      },
    });

    const scale = interpolate(textSpring, [0, 1], [0.8, 1]);
    const opacity = interpolate(textSpring, [0, 0.4, 1], [0, 0.7, 1]);
    const translateY = interpolate(textSpring, [0, 1], [24, 0]);

    const Tag = as;
    return (
      <Tag
        className={className}
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          ...style,
        }}
      >
        {words.map((word, i) => {
          const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
          const isHighlighted = normalizedHighlights.includes(cleanWord);

          return (
            <span
              key={`${word}-${i}`}
              className={isHighlighted ? "font-extrabold" : ""}
              style={{
                color: isHighlighted ? accentColor : undefined,
                marginRight: "0.25em",
                display: "inline-block",
              }}
            >
              {word}
            </span>
          );
        })}
      </Tag>
    );
  }

  // 2. Typewriter Animation
  if (animation === "typewriter") {
    // 1 character every 1.5 frames
    const charsPerFrame = 0.7;
    const visibleChars = Math.floor(activeFrame * charsPerFrame);
    const displayedText = text.slice(0, Math.min(text.length, visibleChars));
    const isTypingDone = visibleChars >= text.length;

    // Blinking cursor: toggles every 15 frames
    const cursorVisible = !isTypingDone || Math.floor(frame / 15) % 2 === 0;

    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {displayedText}
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "1em",
            backgroundColor: accentColor,
            marginLeft: "4px",
            verticalAlign: "middle",
            opacity: cursorVisible ? 1 : 0,
          }}
        />
      </Tag>
    );
  }

  // 3. Word-by-Word Reveal (Staggered spring per word)
  if (animation === "word-by-word") {
    const Tag = as;
    const staggerFrames = 3;

    return (
      <Tag className={`flex flex-wrap items-center justify-center ${className}`} style={style}>
        {words.map((word, idx) => {
          const wordFrame = Math.max(0, activeFrame - idx * staggerFrames);
          const wordSpring = spring({
            frame: wordFrame,
            fps,
            config: {
              damping: 11,
              stiffness: 140,
              mass: 0.6,
            },
          });

          const wordScale = interpolate(wordSpring, [0, 1], [0.6, 1]);
          const wordOpacity = interpolate(wordSpring, [0, 0.3, 1], [0, 0.8, 1]);
          const wordTranslateY = interpolate(wordSpring, [0, 1], [30, 0]);

          const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
          const isHighlighted = normalizedHighlights.includes(cleanWord);

          return (
            <span
              key={`${word}-${idx}`}
              className={`inline-block mr-3 ${isHighlighted ? "font-extrabold tracking-wide" : ""}`}
              style={{
                transform: `translateY(${wordTranslateY}px) scale(${wordScale})`,
                opacity: wordOpacity,
                color: isHighlighted ? accentColor : undefined,
                textShadow: isHighlighted ? `0 0 24px ${accentColor}66` : undefined,
              }}
            >
              {word}
            </span>
          );
        })}
      </Tag>
    );
  }

  // 4. Fade-Slide
  const progress = interpolate(activeFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const translateY = interpolate(progress, [0, 1], [25, 0]);
  const Tag = as;

  return (
    <Tag
      className={className}
      style={{
        transform: `translateY(${translateY}px)`,
        opacity: progress,
        ...style,
      }}
    >
      {text}
    </Tag>
  );
};

