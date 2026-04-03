import { Phone, Globe, Heart, LogOut, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { languageNames, Language } from "@/data/translations";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface User {
  username: string;
  email: string;
  role: string;
}

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Check system preference and stored preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (savedTheme !== "light" && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-tight text-foreground">{t("app.title")}</h1>
            <p className="text-xs text-muted-foreground">{t("app.subtitle")}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-secondary hover:bg-secondary/80 transition-colors"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-yellow-500" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-sm font-medium text-foreground outline-none cursor-pointer"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground hidden sm:inline">
                {user.username}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}

          <a
            href="tel:108"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 emergency-pulse"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">108</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
