import { useState, useMemo } from "react";
import { Filter, Grid3x3 } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const filtered = useMemo(() => {
    let results = diseases;

    // Filter by category
    if (selectedCategory) {
      results = results.filter((d) => d.category === selectedCategory);
    }

    // Filter by search term
    if (!search.trim()) return results;
    const q = search.toLowerCase();
    return results.filter((d) => {
      const name = (diseaseNames[language]?.[d.id] || diseaseNames["en"][d.id]).toLowerCase();
      const symptomMatch = d.symptoms.some((s) => s.toLowerCase().includes(q));
      const causeMatch = d.causes?.some((c) => c.toLowerCase().includes(q)) || false;
      return name.includes(q) || symptomMatch || causeMatch;
    });
  }, [search, language, selectedCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof diseases> = {};
    filtered.forEach((d) => {
      if (!groups[d.category]) groups[d.category] = [];
      groups[d.category].push(d);
    });
    return groups;
  }, [filtered]);

  // Get unique categories from filtered results
  const availableCategories = useMemo(() => {
    return Array.from(new Set(filtered.map((d) => d.category)));
  }, [filtered]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <DisclaimerBanner />
      <HeroSection />

      <main id="conditions" className="flex-1 py-12">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center slide-up">
              <h2 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
                {t("categories.title")}
              </h2>
              <p className="text-muted-foreground text-lg">{t("categories.subtitle")}</p>
              <p className="text-sm text-muted-foreground mt-2">Browse {diseases.length}+ health conditions with professional guidance</p>
            </div>

            <div className="mb-8">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            {/* Category Filter */}
            <div className="mb-8 p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">Filter by Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  All Categories ({diseases.length})
                </button>
                {Object.entries(categoryLabels).map(([key, label]) => {
                  const count = diseases.filter((d) => d.category === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === key
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {label.split(" ")[1]} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <Grid3x3 className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground font-medium mb-2">No conditions found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category} className="slide-up">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        {categoryLabels[category]}
                      </h3>
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {items.length}
                      </span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((disease) => (
                        <DiseaseCard key={disease.id} disease={disease} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Summary Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg border border-border bg-gradient-to-br from-primary/5 to-transparent">
              <div>
                <p className="text-2xl font-bold text-primary">{diseases.length}</p>
                <p className="text-xs text-muted-foreground">Total Conditions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{Object.keys(categoryLabels).length}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{diseases.reduce((acc, d) => acc + d.symptoms.length, 0)}</p>
                <p className="text-xs text-muted-foreground">Total Symptoms</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">24/7</p>
                <p className="text-xs text-muted-foreground">Always Available</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
