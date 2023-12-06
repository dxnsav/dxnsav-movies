import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider.tsx"

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button variant="outline" size="icon" onClick={handleThemeToggle}>
      {theme === 'dark' ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
