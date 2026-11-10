import React from "react";
import { AvatarType } from "../../types/schema";

interface CharacterAvatarProps {
  avatarType?: AvatarType;
  avatarUrl?: string;
  imageData?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  accentColor?: string;
  frame?: number;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ avatarType = "avatar-agent", avatarUrl, imageData, name, size = "md", accentColor = "#10b981", frame = 0 }) => {
  // Subtle breathing / floating animation based on passed frame (works safely inside and outside Remotion)
  const eyeBlink = Math.floor(frame / 60) % 2 === 0;
  const pulse = frame > 0 ? Math.sin((frame / 20) * Math.PI) * 0.05 + 1 : 1;

  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-24 h-24 text-base",
    xl: "w-32 h-32 text-xl",
  }[size];

  const imageSrc = imageData || avatarUrl;

  if (imageSrc) {
    return (
      <div className={`${sizeClasses} rounded-2xl overflow-hidden border-2 shadow-xl shrink-0 bg-slate-900 flex items-center justify-center`} style={{ borderColor: accentColor }}>
        <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  // 1. Robot Cyber Avatar
  if (avatarType === "avatar-robot") {
    return (
      <div className={`${sizeClasses} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 shadow-xl shrink-0`} style={{ borderColor: accentColor, transform: `scale(${pulse})` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3/5 h-3/5" style={{ color: accentColor }}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth={eyeBlink ? "2.5" : "1"} />
          <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth={eyeBlink ? "2.5" : "1"} />
        </svg>
      </div>
    );
  }

  // 2. Executive Avatar
  if (avatarType === "avatar-executive") {
    return (
      <div className={`${sizeClasses} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 shadow-xl shrink-0`} style={{ borderColor: accentColor }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3/5 h-3/5" style={{ color: accentColor }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M12 11v6" strokeWidth="2.2" />
        </svg>
      </div>
    );
  }

  // 3. Creative Avatar
  if (avatarType === "avatar-creative") {
    return (
      <div className={`${sizeClasses} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 shadow-xl shrink-0`} style={{ borderColor: accentColor }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3/5 h-3/5" style={{ color: accentColor }}>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      </div>
    );
  }

  // 4. Default: AI Agent Avatar
  return (
    <div className={`${sizeClasses} rounded-2xl border-2 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 shadow-xl shrink-0`} style={{ borderColor: accentColor }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3/5 h-3/5" style={{ color: accentColor }}>
        <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    </div>
  );
};

