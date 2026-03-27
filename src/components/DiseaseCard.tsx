import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Disease } from "@/data/diseases";
import { useLanguage } from "@/contexts/LanguageContext";
import { diseaseNames } from "@/data/translations";

interface DiseaseCardProps {
  disease: Disease;
}

const DiseaseCard = ({ disease }: DiseaseCardProps) => {
  const { language } = useLanguage();
  const name = diseaseNames[language]?.[disease.id] || diseaseNames["en"][disease.id];

  return (
    <Link
      to={`/condition/${disease.id}`}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl">
        {disease.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground truncate">
          {disease.symptoms[0]}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
};

export default DiseaseCard;
