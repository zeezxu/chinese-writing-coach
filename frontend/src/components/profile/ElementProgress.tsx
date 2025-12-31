// src/components/profile/ElementProgress.tsx
import ElementBadge from "@/components/shared/ElementBadge";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  calculateElement,
  calculateProgress,
  type Element,
} from "@/utils/fiveElements";

interface ElementProgressProps {
  totalEssays: number;
  averageScore: number;
}

export default function ElementProgress({
  totalEssays,
  averageScore,
}: ElementProgressProps) {
  const { t } = useLanguage();
  const element = calculateElement(totalEssays, averageScore);
  const progress = calculateProgress(totalEssays, averageScore);

  // Get element name translation
  const getElementName = (elementType: Element) => {
    const elementMap: Record<Element, string> = {
      wood: t("wood"),
      fire: t("fire"),
      earth: t("earth"),
      metal: t("metal"),
      water: t("water"),
    };
    return elementMap[elementType];
  };

  // Get element message translation
  const getElementMessage = (elementType: Element) => {
    const messageMap: Record<Element, string> = {
      wood: t("woodMessage"),
      fire: t("fireMessage"),
      earth: t("earthMessage"),
      metal: t("metalMessage"),
      water: t("waterMessage"),
    };
    return messageMap[elementType];
  };

  // Get element color
  const getElementColor = (elementType: Element) => {
    const colorMap: Record<Element, string> = {
      wood: "#22c55e",
      fire: "#f97316",
      earth: "#eab308",
      metal: "#71717a",
      water: "#3b82f6",
    };
    return colorMap[elementType];
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
      {/* Element Badge - Centered */}
      <div className="text-center mb-4">
        <h2 className="text-sm font-medium text-gray-600 mb-3">
          {t("currentElement")}
        </h2>
        <div className="flex flex-col items-center gap-2">
          <ElementBadge
            element={element.name}
            level={element.level}
            size="lg"
          />
        </div>
      </div>

      {/* Encouraging Message - Centered */}
      <div className="bg-white/50 rounded-lg p-4 mb-4 text-center">
        <p className="text-sm text-gray-700 font-medium">
          {getElementMessage(element.name)}
        </p>
      </div>

      {/* Progress Bar */}
      {progress.next && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {t("progress")} {t("nextElement")}:{" "}
              {getElementName(progress.next)}
            </span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progress.progressPercent)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{
                width: `${progress.progressPercent}%`,
                background: `linear-gradient(to right, ${getElementColor(
                  element.name
                )}, ${getElementColor(progress.next)})`,
              }}
            />
          </div>

          {/* Requirements */}
          <div
            className={`grid gap-3 text-xs ${
              progress.essaysNeeded > 0 && progress.scoreNeeded > 0
                ? "grid-cols-2"
                : "grid-cols-1 max-w-xs mx-auto"
            }`}
          >
            {progress.essaysNeeded > 0 && (
              <div className="bg-white/70 rounded p-3 text-center">
                <div className="text-gray-600">
                  {progress.essaysNeeded} {t("essaysToNext")}
                </div>
                <div className="font-semibold text-gray-900">
                  {getElementName(progress.next)}
                </div>
              </div>
            )}
            {progress.scoreNeeded > 0 && (
              <div className="bg-white/70 rounded p-3 text-center">
                <div className="text-gray-600">
                  {progress.scoreNeeded}+ {t("avgScoreToNext")}
                </div>
                <div className="font-semibold text-gray-900">
                  {getElementName(progress.next)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Element Journey - Centered */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-600 mb-2 text-center">
          {t("elementJourney")}
        </div>
        <div className="flex items-center justify-center gap-2 text-2xl">
          <span
            className={
              element.name === "wood"
                ? "scale-125 transition-transform"
                : "opacity-40"
            }
          >
            🌳
          </span>
          <span className="text-gray-300">→</span>
          <span
            className={
              element.name === "fire"
                ? "scale-125 transition-transform"
                : "opacity-40"
            }
          >
            🔥
          </span>
          <span className="text-gray-300">→</span>
          <span
            className={
              element.name === "earth"
                ? "scale-125 transition-transform"
                : "opacity-40"
            }
          >
            ⛰️
          </span>
          <span className="text-gray-300">→</span>
          <span
            className={
              element.name === "metal"
                ? "scale-125 transition-transform"
                : "opacity-40"
            }
          >
            ✨
          </span>
          <span className="text-gray-300">→</span>
          <span
            className={
              element.name === "water"
                ? "scale-125 transition-transform"
                : "opacity-40"
            }
          >
            🌊
          </span>
        </div>
      </div>
    </div>
  );
}
