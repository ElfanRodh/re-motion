import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

export const TrophyFlatIcon: React.FC<IconProps> = ({ size = 28, color = "#0B2545" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z"
      fill={color}
    />
    <path
      d="M6 5H3V8C3 9.65685 4.34315 11 6 11M18 5H21V8C21 9.65685 19.6569 11 18 11"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <rect x="10.5" y="14.5" width="3" height="4.5" fill={color} />
    <rect x="7" y="19" width="10" height="2.5" rx="1" fill={color} />
  </svg>
);

export const ChartBarFlatIcon: React.FC<IconProps> = ({ size = 28, color = "#F5B700" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="13" width="4.5" height="8" rx="1" fill={color} />
    <rect x="9.75" y="8" width="4.5" height="13" rx="1" fill={color} />
    <rect x="16.5" y="3" width="4.5" height="18" rx="1" fill={color} />
  </svg>
);

export const MapPinFlatIcon: React.FC<IconProps> = ({ size = 28, color = "#F5B700" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C7.58 2 4 5.58 4 10C4 15.25 12 22 12 22C12 22 20 15.25 20 10C20 5.58 16.42 2 12 2ZM12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13Z"
      fill={color}
    />
  </svg>
);

export const ShieldCheckFlatIcon: React.FC<IconProps> = ({ size = 28, color = "#F5B700" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L4 5.5V11.5C4 16.8 7.4 21.6 12 23C16.6 21.6 20 16.8 20 11.5V5.5L12 2Z"
      fill={color}
    />
    <path
      d="M9 12.5L11 14.5L15.5 10"
      stroke="#0B2545"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HeartFlatIcon: React.FC<IconProps> = ({ size = 24, color = "#F43F5E" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
  </svg>
);

export const CommentFlatIcon: React.FC<IconProps> = ({ size = 24, color = "#38BDF8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
  </svg>
);

export const ShareFlatIcon: React.FC<IconProps> = ({ size = 24, color = "#F5B700" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12M16 6L12 2M12 2L8 6M12 2V15"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

