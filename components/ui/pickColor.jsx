"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useContext, useState, useEffect } from "react";
import AppearanceContext from "@/context/appearance";

const colorPresets = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#C0C0C0",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#800080",
  "#008080",
  "#000080",
  "#FFA500",
  "#A52A2A",
  "#800080",
  "#FFC0CB",
];

export default function PickColor({ color, setColor, IsGradient }) {
  const { theme, setTheme } = useContext(AppearanceContext);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    console.log(color);
  }, [color]);

  return (
    <div className="space-y-4">
      {!IsGradient && (
        <div
          className="w-full h-40 border rounded-md"
          style={{ backgroundColor: color }}
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="color-picker">Pick a color</Label>
        <div className="flex space-x-2">
          <Input
            id="color-picker"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-1 rounded-md"
          />
          <Button size="icon" variant="outline" onClick={copyToClipboard}>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Presets</Label>
        <div className="grid grid-cols-10 gap-2">
          {colorPresets.map((preset, i) => (
            <button
              key={i}
              className="w-full h-6 border rounded-md"
              style={{ backgroundColor: preset }}
              onClick={() => setColor(preset)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
