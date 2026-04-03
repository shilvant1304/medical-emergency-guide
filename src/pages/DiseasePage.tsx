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
                <section className="rounded-xl border-2 border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-150 dark:from-blue-950 to-blue-50 dark:to-blue-900 p-6 shadow-md">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900 dark:text-blue-300">
                    <Book className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                    Professional Background
                  </h2>
                  <p className="text-sm text-blue-950 dark:text-blue-100 leading-relaxed font-medium">
                    {disease.background}
                  </p>
                </section>
              )}

              {/* Epidemiology */}
              {disease.epidemiology && (
                <section className="rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-gradient-to-br from-purple-150 dark:from-purple-950 to-purple-50 dark:to-purple-900 p-6 shadow-md">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-purple-900 dark:text-purple-300">
                    <TrendingUp className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                    Epidemiology & Statistics
                  </h2>
                  <p className="text-sm text-purple-950 dark:text-purple-100 leading-relaxed font-medium">
                    {disease.epidemiology}
                  </p>
                </section>
              )}

              {/* Risk Factors */}
              {disease.riskFactors && disease.riskFactors.length > 0 && (
                <section className="rounded-xl border-2 border-purple-500 dark:border-purple-600 bg-card dark:bg-slate-800 p-6 shadow-md">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-purple-900 dark:text-purple-300">
                    <TrendingUp className="h-5 w-5 text-purple-700 dark:text-purple-400" />
                    Risk Factors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {disease.riskFactors.map((factor, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-200 dark:bg-purple-900 border-2 border-purple-400 dark:border-purple-600">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-700 dark:bg-purple-300 flex-shrink-0" />
                        <span className="text-sm text-purple-950 dark:text-purple-100 font-semibold">{factor}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Causes */}
              {disease.causes && disease.causes.length > 0 && (
                <section className="rounded-xl border-2 border-red-400 dark:border-red-600 bg-gradient-to-br from-red-100 dark:from-red-950 to-red-50 dark:to-red-900 p-6 shadow-md">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-900 dark:text-red-300">
                    <Microscope className="h-5 w-5 text-red-700 dark:text-red-400" />
                    Causes
                  </h2>
                  <ul className="space-y-2">
                    {disease.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-red-950 dark:text-red-100 font-medium">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-700 dark:bg-red-300" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Prevention */}
              {disease.prevention && disease.prevention.length > 0 && (
                <section className="rounded-xl border-2 border-green-400 dark:border-green-600 bg-gradient-to-br from-green-150 dark:from-green-950 to-green-50 dark:to-green-900 p-6 shadow-md">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-900 dark:text-green-300">
                    <Shield className="h-5 w-5 text-green-700 dark:text-green-400" />
                    Prevention Measures
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {disease.prevention.map((prev, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-green-950 dark:text-green-100 font-medium">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-700 dark:bg-green-300 flex-shrink-0" />
                        {prev}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Symptoms */}
              <section className="rounded-xl border-2 border-orange-400 dark:border-orange-600 bg-gradient-to-br from-orange-150 dark:from-orange-950 to-orange-50 dark:to-orange-900 p-6 slide-up shadow-md">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-orange-900 dark:text-orange-300">
                  <AlertTriangle className="h-5 w-5 text-orange-700 dark:text-orange-400" />
                  Symptoms & Signs
                </h2>
                <ul className="space-y-2">
                  {disease.symptoms.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-orange-950 dark:text-orange-100 font-medium">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-700 dark:bg-orange-300" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Immediate Actions */}
              <section className="rounded-xl border-2 border-green-500 dark:border-green-600 bg-gradient-to-br from-green-100 dark:from-green-950 to-green-50 dark:to-green-900 p-6 slide-up shadow-md">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-900 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
                  Immediate Actions to Take
                </h2>
                <ol className="space-y-3">
                  {disease.immediateActions.map((a) => (
                    <li key={a.step} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 dark:bg-green-500 text-xs font-bold text-white">
                        {a.step}
                      </span>
                      <span className="text-sm text-green-950 dark:text-green-100 pt-0.5 font-bold">{a.action}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Do NOTs */}
              <section className="rounded-xl border-2 border-red-500 dark:border-red-600 bg-gradient-to-br from-red-150 dark:from-red-950 to-red-50 dark:to-red-900 p-6 slide-up shadow-md">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-900 dark:text-red-300">
                  <XCircle className="h-5 w-5 text-red-700 dark:text-red-400" />
                  What NOT to Do
                </h2>
                <ul className="space-y-2">
                  {disease.doNots.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-red-950 dark:text-red-100 font-medium">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700 dark:text-red-400 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </section>

              {/* When to go to hospital */}
              <section className="rounded-xl border-2 border-blue-500 dark:border-blue-600 bg-gradient-to-br from-blue-150 dark:from-blue-950 to-blue-50 dark:to-blue-900 p-6 slide-up shadow-md">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900 dark:text-blue-300">
                  <Building2 className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                  When to Seek Hospital Care
                </h2>
                <ul className="space-y-2">
                  {disease.whenToHospital.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-blue-950 dark:text-blue-100 font-medium">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-700 dark:bg-blue-300" />
                      {w}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Footer Note */}
              <div className="mt-8 p-6 rounded-xl border-2 border-amber-500 dark:border-amber-600 bg-gradient-to-r from-amber-200 dark:from-amber-950 to-amber-100 dark:to-amber-900">
                <p className="text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
                  <strong className="text-amber-900 dark:text-amber-300">⚠️ Disclaimer:</strong> This information is for educational purposes only and not a substitute for professional medical advice. Always consult qualified healthcare providers for diagnosis and treatment. In case of emergency, call 108 immediately.
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
