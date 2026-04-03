import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Building2,
  Shield,
  Microscope,
  Book,
  TrendingUp
} from "lucide-react";
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
          <div className="mx-auto max-w-4xl">
            {/* Back link */}
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("disease.back")}
            </Link>

            {/* Title Section */}
            <div className="mb-8 fade-in">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{disease.icon}</span>
                <div>
                  <h1 className="text-4xl font-black text-foreground sm:text-5xl">{name}</h1>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
                    {disease.category}
                  </div>
                </div>
              </div>

              {/* Emergency CTA */}
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 rounded-lg bg-destructive px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-destructive/90 transition-all emergency-pulse"
              >
                <Phone className="h-5 w-5" />
                Emergency: Call 108
              </a>
            </div>

            <div className="space-y-8">
              {/* Background & Professional Information */}
              {disease.background && (
                <section className="rounded-xl border border-border bg-gradient-to-br from-blue-50 to-transparent p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                    <Book className="h-5 w-5 text-blue-600" />
                    Professional Background
                  </h2>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {disease.background}
                  </p>
                </section>
              )}

              {/* Epidemiology */}
              {disease.epidemiology && (
                <section className="rounded-xl border border-border bg-gradient-to-br from-purple-50 to-transparent p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Epidemiology & Statistics
                  </h2>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {disease.epidemiology}
                  </p>
                </section>
              )}

              {/* Risk Factors */}
              {disease.riskFactors && disease.riskFactors.length > 0 && (
                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    Risk Factors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {disease.riskFactors.map((factor, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-200 border-2 border-purple-400">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-700 flex-shrink-0" />
                        <span className="text-sm text-purple-950 font-semibold">{factor}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Causes */}
              {disease.causes && disease.causes.length > 0 && (
                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                    <Microscope className="h-5 w-5 text-red-600" />
                    Causes
                  </h2>
                  <ul className="space-y-2">
                    {disease.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Prevention */}
              {disease.prevention && disease.prevention.length > 0 && (
                <section className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-transparent p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                    <Shield className="h-5 w-5 text-green-600" />
                    Prevention Measures
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {disease.prevention.map((prev, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600 flex-shrink-0 mt-1" />
                        {prev}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Symptoms */}
              <section className="rounded-xl border border-border bg-card p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Symptoms & Signs
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
              <section className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  Immediate Actions to Take
                </h2>
                <ol className="space-y-3">
                  {disease.immediateActions.map((a) => (
                    <li key={a.step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {a.step}
                      </span>
                      <span className="text-sm text-foreground/90 pt-0.5 font-medium">{a.action}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Do NOTs */}
              <section className="rounded-xl border border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-destructive">
                  <XCircle className="h-5 w-5" />
                  What NOT to Do
                </h2>
                <ul className="space-y-2">
                  {disease.doNots.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </section>

              {/* When to go to hospital */}
              <section className="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-transparent p-6 slide-up">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-700">
                  <Building2 className="h-5 w-5" />
                  When to Seek Hospital Care
                </h2>
                <ul className="space-y-2">
                  {disease.whenToHospital.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      {w}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Footer Note */}
              <div className="mt-8 p-6 rounded-xl border-2 border-amber-500 bg-gradient-to-r from-amber-200 to-amber-100">
                <p className="text-sm text-amber-950 leading-relaxed font-medium">
                  <strong className="text-amber-900">⚠️ Disclaimer:</strong> This information is for educational purposes only and not a substitute for professional medical advice. Always consult qualified healthcare providers for diagnosis and treatment. In case of emergency, call 108 immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiseasePage;
