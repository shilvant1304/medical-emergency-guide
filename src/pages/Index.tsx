import { useState, useMemo } from "react";
import Header from "@/components/Header";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import DiseaseCard from "@/components/DiseaseCard";
import Footer from "@/components/Footer";
import { diseases, categoryLabels } from "@/data/diseases";
import { useLanguage } from "@/contexts/LanguageContext";
import { diseaseNames } from "@/data/translations";

const Index = () => {
  const [search, setSearch] = useState("");
  const { language, t } = useLanguage();

  const filtered = useMemo(() => {
    if (!search.trim()) return diseases;
    const q = search.toLowerCase();
    return diseases.filter((d) => {
      const name = (diseaseNames[language]?.[d.id] || diseaseNames["en"][d.id]).toLowerCase();
      const symptomMatch = d.symptoms.some((s) => s.toLowerCase().includes(q));
      return name.includes(q) || symptomMatch;
    });
  }, [search, language]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof diseases> = {};
    filtered.forEach((d) => {
      if (!groups[d.category]) groups[d.category] = [];
      groups[d.category].push(d);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <DisclaimerBanner />
      <HeroSection />

      <main id="conditions" className="flex-1 py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center slide-up">
              <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                {t("categories.title")}
              </h2>
              <p className="text-muted-foreground">{t("categories.subtitle")}</p>
            </div>

            <div className="mb-8">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t("search.no_results")}</p>
            ) : (
              <div className="space-y-8">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="slide-up">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {categoryLabels[category]}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {items.map((disease) => (
                        <DiseaseCard key={disease.id} disease={disease} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
