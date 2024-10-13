import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using a UI library

const ThemeButton = ({ theme, currentTheme, setTheme }) => {
  const isSelected = currentTheme?.themeName === theme.themeName;

  const getGradientStyle = (gradientObj) => {
    return gradientObj?.isGradient
      ? `linear-gradient(${gradientObj.gradient?.dir}, ${gradientObj.gradient?.from}, ${gradientObj.gradient?.to})`
      : gradientObj?.bgColor;
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-fit">
      <Button
        type="button"
        onClick={() => setTheme(theme)}
        style={{
          background: getGradientStyle(theme),
        }}
        className={`flex flex-col items-center justify-center h-20 gap-1 rounded-md w-14
          ${isSelected ? "border-[3px] border-white" : ""}`}
      >
        {[1, 2, 3].map((_, index) => (
          <span
            key={index}
            className="w-10 h-2 rounded-md"
            style={{
              background: getGradientStyle(theme.linkStyle),
            }}
          />
        ))}
      </Button>
      <span className="text-sm">{theme.themeName}</span>
    </div>
  );
};

const ThemeSelector = ({ themes, currentTheme, setTheme }) => {
  return (
    <div className="flex justify-start space-x-4">
      {themes.map((theme) => (
        <ThemeButton
          key={theme.themeName}
          theme={theme}
          currentTheme={currentTheme}
          setTheme={setTheme}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
