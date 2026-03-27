import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, AlertTriangle, CheckCircle2, XCircle, Building2 } from "lucide-react";
import Header from "@/components/Header";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Footer from "@/components/Footer";
import { diseases } from "@/data/diseases";
import { useLanguage } from "@/contexts/LanguageContext";
import { diseaseNames } from "@/data/translations";

const DiseasePage = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const disease = diseases.find((d) => d.id === id);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Condition not found</h1>
            <Link to="/" className="text-primary hover:underline">{t("disease.back")}</Link>
          </div>
        </div>
      </div>
    );
  }

  const name = diseaseNames[language]?.[disease.id] || diseaseNames["en"][disease.id];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <DisclaimerBanner />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("disease.back")}
            </Link>

            {/* Title */}
            <div className="mb-8 fade-in">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{disease.icon}</span>
                <h1 className="text-3xl font-black text-foreground sm:text-4xl">{name}</h1>
              </div>

              {/* Emergency CTA */}
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground emergency-pulse"
              >
                <Phone className="h-4 w-4" />
                {t("hero.call")}
              </a>
            </div>

            <div className="space-y-8">
              {/* Symptoms */}
              <section className="rounded-xl border border-border bg-card p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  {t("disease.symptoms")}
                </h2>
                <ul className="space-y-2">
                  {disease.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Immediate Actions */}
              <section className="rounded-xl border-2 border-primary/20 bg-primary/[0.03] p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  {t("disease.actions")}
                </h2>
                <ol className="space-y-3">
                  {disease.immediateActions.map((a) => (
                    <li key={a.step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {a.step}
                      </span>
                      <span className="text-sm text-foreground/90 pt-0.5">{a.action}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Do NOTs */}
              <section className="rounded-xl border border-destructive/20 bg-destructive/[0.03] p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-destructive">
                  <XCircle className="h-5 w-5" />
                  {t("disease.donots")}
                </h2>
                <ul className="space-y-2">
                  {disease.doNots.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/60" />
                      {d}
                    </li>
                  ))}
                </ul>
              </section>

              {/* When to go to hospital */}
              <section className="rounded-xl border border-info/20 bg-info/[0.03] p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-info">
                  <Building2 className="h-5 w-5" />
                  {t("disease.hospital")}
                </h2>
                <ul className="space-y-2">
                  {disease.whenToHospital.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
                      {w}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiseasePage;
