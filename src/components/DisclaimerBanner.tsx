import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DisclaimerBanner = () => {
  const { t } = useLanguage();

  return (
    <div className="border-b border-red-200 bg-gradient-to-r from-red-50 to-red-100/50 px-4 py-3">
      <div className="container flex items-start gap-2.5 text-xs sm:text-sm">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
        <p className="font-medium text-red-900">{t("app.disclaimer")}</p>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
