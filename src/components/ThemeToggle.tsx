import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { FC } from "react";

export const ThemeToggleButton: FC = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="rounded-full"
      onClick={handleThemeToggle}
      size="icon"
      variant={theme === "dark" ? "link" : "ghost"}
    >
      {theme === "dark" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
