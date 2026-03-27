import { Phone, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToConditions = () => {
    document.getElementById("conditions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-primary/[0.03] py-16 sm:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {t("app.subtitle")}
          </div>

          <h1 className="mb-6 text-4xl font-black leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:108"
              className="flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] emergency-pulse"
            >
              <Phone className="h-5 w-5" />
              {t("hero.call")}
            </a>

            <button
              onClick={scrollToConditions}
              className="flex items-center gap-2 rounded-xl border-2 border-border bg-card px-8 py-4 text-lg font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-secondary"
            >
              {t("hero.explore")}
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
