import React from "react";
import { SceneConfig, ThemeConfig } from "../../types/schema";
import { TextHighlightScene } from "./TextHighlightScene";
import { ChartScene } from "./ChartScene";
import { AvatarDialogScene } from "./AvatarDialogScene";
import { IllustrationScene } from "./IllustrationScene";
import { Scene1Hook } from "../Scene1Hook";
import { Scene2Jatim } from "../Scene2Jatim";
import { Scene3Bojonegoro } from "../Scene3Bojonegoro";
import { Scene4Beras } from "../Scene4Beras";
import { Scene5Outro } from "../Scene5Outro";

interface SceneRendererProps {
  scene: SceneConfig;
  theme: ThemeConfig;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, theme }) => {
  // 1. Dedicated Bojonegoro Reels Scenes (Guide Architecture)
  if (scene.id === "scene-1-bojonegoro-juara-1") {
    return <Scene1Hook />;
  }
  if (scene.id === "scene-2-jatim-lumbung-nasional") {
    return <Scene2Jatim />;
  }
  if (scene.id === "scene-3-klasemen-3-besar") {
    return <Scene3Bojonegoro />;
  }
  if (scene.id === "scene-4-beras-siap-konsumsi") {
    return <Scene4Beras />;
  }
  if (scene.id === "scene-5-apresiasi-petani") {
    return <Scene5Outro />;
  }

  // 2. Generic Dynamic Fallback
  switch (scene.visualType) {
    case "text-highlight":
      return <TextHighlightScene scene={scene} theme={theme} />;

    case "chart":
      return <ChartScene scene={scene} theme={theme} />;

    case "avatar-dialog":
      return <AvatarDialogScene scene={scene} theme={theme} />;

    case "illustration":
      return <IllustrationScene scene={scene} theme={theme} />;

    default:
      return <TextHighlightScene scene={scene} theme={theme} />;
  }
};
