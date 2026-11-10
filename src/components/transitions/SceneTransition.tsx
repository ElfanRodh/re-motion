import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { TransitionType } from "../../types/schema";

interface SceneTransitionProps {
  children: React.ReactNode;
  durationInFrames: number;
  transitionIn?: TransitionType;
  transitionOut?: TransitionType;
  transitionDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({ children, durationInFrames, transitionIn = "fade", transitionOut = "fade", transitionDuration = 12, className = "", style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring / interpolation
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  // Exit interpolation calculation
  const exitStartFrame = Math.max(0, durationInFrames - transitionDuration);
  const exitProgress = interpolate(frame, [exitStartFrame, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  let opacity = 1;
  let transform = "";
  let filter = "";

  // Handle Entrance
  switch (transitionIn) {
    case "fade":
      opacity = interpolate(frame, [0, transitionDuration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      });
      break;

    case "slide-up":
      opacity = enterSpring;
      const translateYIn = interpolate(enterSpring, [0, 1], [60, 0]);
      transform += ` translateY(${translateYIn}px)`;
      break;

    case "slide-left":
      opacity = enterSpring;
      const translateXIn = interpolate(enterSpring, [0, 1], [80, 0]);
      transform += ` translateX(${translateXIn}px)`;
      break;

    case "zoom-blur":
      opacity = interpolate(frame, [0, transitionDuration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const scaleIn = interpolate(enterSpring, [0, 1], [1.12, 1]);
      const blurIn = interpolate(enterSpring, [0, 1], [8, 0]);
      transform += ` scale(${scaleIn})`;
      filter += ` blur(${blurIn}px)`;
      break;

    case "scale-bounce":
      const bounceScaleIn = interpolate(enterSpring, [0, 1], [0.85, 1]);
      opacity = interpolate(enterSpring, [0, 0.4, 1], [0, 0.8, 1]);
      transform += ` scale(${bounceScaleIn})`;
      break;

    case "none":
    default:
      opacity = 1;
      break;
  }

  // Handle Exit
  if (frame >= exitStartFrame) {
    switch (transitionOut) {
      case "fade":
        opacity = Math.min(opacity, 1 - exitProgress);
        break;

      case "slide-up":
        opacity = Math.min(opacity, 1 - exitProgress);
        const translateYOut = interpolate(exitProgress, [0, 1], [0, -60]);
        transform += ` translateY(${translateYOut}px)`;
        break;

      case "slide-left":
        opacity = Math.min(opacity, 1 - exitProgress);
        const translateXOut = interpolate(exitProgress, [0, 1], [0, -80]);
        transform += ` translateX(${translateXOut}px)`;
        break;

      case "zoom-blur":
        opacity = Math.min(opacity, 1 - exitProgress);
        const scaleOut = interpolate(exitProgress, [0, 1], [1, 0.94]);
        const blurOut = interpolate(exitProgress, [0, 1], [0, 10]);
        transform += ` scale(${scaleOut})`;
        filter += ` blur(${blurOut}px)`;
        break;

      case "scale-bounce":
        opacity = Math.min(opacity, 1 - exitProgress);
        const scaleBounceOut = interpolate(exitProgress, [0, 1], [1, 0.9]);
        transform += ` scale(${scaleBounceOut})`;
        break;

      case "none":
      default:
        break;
    }
  }

  return (
    <div
      className={`w-full h-full relative overflow-hidden flex flex-col items-center justify-center ${className}`}
      style={{
        opacity,
        transform: transform.trim() || undefined,
        filter: filter.trim() || undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

