"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyIcon, ShuffleIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import AppearanceContext from "@/context/appearance";
import { useEffect } from "react";

const tailwindColors = {
  slate: [
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
  ],
  gray: [
    "#f9fafb",
    "#f3f4f6",
    "#e5e7eb",
    "#d1d5db",
    "#9ca3af",
    "#6b7280",
    "#4b5563",
    "#374151",
    "#1f2937",
    "#111827",
  ],
  zinc: [
    "#fafafa",
    "#f4f4f5",
    "#e4e4e7",
    "#d4d4d8",
    "#a1a1aa",
    "#71717a",
    "#52525b",
    "#3f3f46",
    "#27272a",
    "#18181b",
  ],
  neutral: [
    "#fafafa",
    "#f5f5f5",
    "#e5e5e5",
    "#d4d4d4",
    "#a3a3a3",
    "#737373",
    "#525252",
    "#404040",
    "#262626",
    "#171717",
  ],
  stone: [
    "#fafaf9",
    "#f5f5f4",
    "#e7e5e4",
    "#d6d3d1",
    "#a8a29e",
    "#78716c",
    "#57534e",
    "#44403c",
    "#292524",
    "#1c1917",
  ],
  red: [
    "#fef2f2",
    "#fee2e2",
    "#fecaca",
    "#fca5a5",
    "#f87171",
    "#ef4444",
    "#dc2626",
    "#b91c1c",
    "#991b1b",
    "#7f1d1d",
  ],
  orange: [
    "#fff7ed",
    "#ffedd5",
    "#fed7aa",
    "#fdba74",
    "#fb923c",
    "#f97316",
    "#ea580c",
    "#c2410c",
    "#9a3412",
    "#7c2d12",
  ],
  amber: [
    "#fffbeb",
    "#fef3c7",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f59e0b",
    "#d97706",
    "#b45309",
    "#92400e",
    "#78350f",
  ],
  yellow: [
    "#fefce8",
    "#fef9c3",
    "#fef08a",
    "#fde047",
    "#facc15",
    "#eab308",
    "#ca8a04",
    "#a16207",
    "#854d0e",
    "#713f12",
  ],
  lime: [
    "#f7fee7",
    "#ecfccb",
    "#d9f99d",
    "#bef264",
    "#a3e635",
    "#84cc16",
    "#65a30d",
    "#4d7c0f",
    "#3f6212",
    "#365314",
  ],
  green: [
    "#f0fdf4",
    "#dcfce7",
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
  ],
  emerald: [
    "#ecfdf5",
    "#d1fae5",
    "#a7f3d0",
    "#6ee7b7",
    "#34d399",
    "#10b981",
    "#059669",
    "#047857",
    "#065f46",
    "#064e3b",
  ],
  teal: [
    "#f0fdfa",
    "#ccfbf1",
    "#99f6e4",
    "#5eead4",
    "#2dd4bf",
    "#14b8a6",
    "#0d9488",
    "#0f766e",
    "#115e59",
    "#134e4a",
  ],
  cyan: [
    "#ecfeff",
    "#cffafe",
    "#a5f3fc",
    "#67e8f9",
    "#22d3ee",
    "#06b6d4",
    "#0891b2",
    "#0e7490",
    "#155e75",
    "#164e63",
  ],
  sky: [
    "#f0f9ff",
    "#e0f2fe",
    "#bae6fd",
    "#7dd3fc",
    "#38bdf8",
    "#0ea5e9",
    "#0284c7",
    "#0369a1",
    "#075985",
    "#0c4a6e",
  ],
  blue: [
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#1e3a8a",
  ],
  indigo: [
    "#eef2ff",
    "#e0e7ff",
    "#c7d2fe",
    "#a5b4fc",
    "#818cf8",
    "#6366f1",
    "#4f46e5",
    "#4338ca",
    "#3730a3",
    "#312e81",
  ],
  violet: [
    "#f5f3ff",
    "#ede9fe",
    "#ddd6fe",
    "#c4b5fd",
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#6d28d9",
    "#5b21b6",
    "#4c1d95",
  ],
  purple: [
    "#faf5ff",
    "#f3e8ff",
    "#e9d5ff",
    "#d8b4fe",
    "#c084fc",
    "#a855f7",
    "#9333ea",
    "#7e22ce",
    "#6b21a8",
    "#581c87",
  ],
  fuchsia: [
    "#fdf4ff",
    "#fae8ff",
    "#f5d0fe",
    "#f0abfc",
    "#e879f9",
    "#d946ef",
    "#c026d3",
    "#a21caf",
    "#86198f",
    "#701a75",
  ],
  pink: [
    "#fdf2f8",
    "#fce7f3",
    "#fbcfe8",
    "#f9a8d4",
    "#f472b6",
    "#ec4899",
    "#db2777",
    "#be185d",
    "#9d174d",
    "#831843",
  ],
  rose: [
    "#fff1f2",
    "#ffe4e6",
    "#fecdd3",
    "#fda4af",
    "#fb7185",
    "#f43f5e",
    "#e11d48",
    "#be123c",
    "#9f1239",
    "#881337",
  ],
};

const gradientDirections = [
  { value: "to right", label: "Left to Right" },
  { value: "to left", label: "Right to Left" },
  { value: "to bottom", label: "Top to Bottom" },
  { value: "to top", label: "Bottom to Top" },
  { value: "to bottom right", label: "Top Left to Bottom Right" },
  { value: "to bottom left", label: "Top Right to Bottom Left" },
  { value: "to top right", label: "Bottom Left to Top Right" },
  { value: "to top left", label: "Bottom Right to Top Left" },
];

export default function Gradient() {
  const { theme, setTheme, userSite } = useContext(AppearanceContext);

  const [fromColor, setFromColor] = useState(theme.gradient.from || "#10b981");
  const [toColor, setToColor] = useState(theme.gradient.to || "#84cc16");
  const [direction, setDirection] = useState(theme.gradient.dir || "to right");

  const handleColorClick = (color, isFromColor) => {
    if (isFromColor) {
      setFromColor(color);
    } else {
      setToColor(color);
    }
  };

  const handleRandom = () => {
    const randomColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    setFromColor(randomColor());
    setToColor(randomColor());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `background: linear-gradient(${direction}, ${fromColor}, ${toColor});`
    );
  };

  useEffect(() => {
    setTheme({
      ...theme,
      gradient: {
        from: fromColor,
        to: toColor,
        dir: direction,
      },
    });
  }, [fromColor, toColor, direction]);

  return (
    <div className="w-full max-w-4xl p-6 mx-auto rounded-lg shadow-lg bg-slate-700">
      <div className="flex gap-4">
        <Tabs defaultValue="from" className="relative w-full">
          <TabsList className="flex justify-between w-full">
            <TabsTrigger value="from">From Color</TabsTrigger>
            <TabsTrigger value="to">To Color</TabsTrigger>
          </TabsList>
          <TabsContent value="from">
            <ScrollArea className="rounded-md h-96">
              {Object.entries(tailwindColors).map(([paletteName, colors]) => (
                <div key={paletteName} className="mb-4">
                  <h3 className="mb-2 text-sm font-medium capitalize">
                    {paletteName}
                  </h3>
                  <div className="grid grid-cols-10 gap-1">
                    {colors.map((color, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <button
                          key={color}
                          className={`w-14 h-10 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorClick(color, true)}
                          title={`${paletteName}-${(index + 1) * 100}`}
                          type="button"
                        />
                        <span>{index === 0 ? "50" : ` ${index * 100}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="to">
            {" "}
            <ScrollArea className="rounded-md h-96">
              {Object.entries(tailwindColors).map(([paletteName, colors]) => (
                <div key={paletteName} className="mb-4">
                  <h3 className="mb-2 text-sm font-medium capitalize">
                    {paletteName}
                  </h3>
                  <div className="grid grid-cols-10 gap-1">
                    {colors.map((color, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <button
                          key={color}
                          className="h-10 rounded-md w-14 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorClick(color, false)}
                          title={`${paletteName}-${(index + 1) * 100}`}
                          type="button"
                        />
                        <span>{index === 0 ? "50" : ` ${index * 100}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-6 space-y-2">
        <span className="font-medium">Select Gradient Direction :</span>
        <Select onValueChange={setDirection} defaultValue={direction}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gradient direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Gradient Direction</SelectLabel>
              {gradientDirections.map((dir) => (
                <SelectItem key={dir.value} value={dir.value}>
                  {dir.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative mt-4">
        <div
          className="w-full h-40 rounded-lg"
          style={{
            background: `linear-gradient(${direction}, ${fromColor}, ${toColor})`,
          }}
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute bg-white top-2 right-2"
          onClick={handleCopy}
        >
          <CopyIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline" type={"button"} onClick={handleRandom}>
          <ShuffleIcon className="w-4 h-4 mr-2" />
          Random
        </Button>
      </div>
    </div>
  );
}
