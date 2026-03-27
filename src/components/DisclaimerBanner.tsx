import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DisclaimerBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="border-b border-warning/30 bg-warning/10 px-4 py-2.5">
      <div className="container flex items-start gap-2 text-xs sm:text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p className="text-foreground/80">{t("app.disclaimer")}</p>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
