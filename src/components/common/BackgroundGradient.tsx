import React from "react";
import { ThemeConfig } from "../../types/schema";
import { OceanFlatBackground } from "./OceanFlatBackground";

interface BackgroundGradientProps {
  theme: ThemeConfig;
  accentColor?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = () => {
  return <OceanFlatBackground />;
};
