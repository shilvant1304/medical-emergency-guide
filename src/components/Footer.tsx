import { Heart, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-secondary/50 py-10">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-primary">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-bold">{t("footer.disclaimer")}</h3>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">{t("footer.text")}</p>
          <p className="mb-6 text-sm font-semibold text-foreground">{t("footer.emergency")}</p>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-primary" fill="currentColor" />
            <span>for India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
