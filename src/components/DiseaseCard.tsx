import { ChevronRight, AlertCircle, Heart, Activity, Zap, Baby, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Disease } from "@/data/diseases";
import { useLanguage } from "@/contexts/LanguageContext";
import { diseaseNames } from "@/data/translations";

interface DiseaseCardProps {
  disease: Disease;
}

const categoryIcons: Record<string, React.ReactNode> = {
  cardiac: <Heart className="h-4 w-4" />,
  respiratory: <Wind className="h-4 w-4" />,
  infectious: <Activity className="h-4 w-4" />,
  injury: <AlertCircle className="h-4 w-4" />,
  poisoning: <Zap className="h-4 w-4" />,
  pediatric: <Baby className="h-4 w-4" />,
  other: <AlertCircle className="h-4 w-4" />,
};

const categoryColors: Record<string, string> = {
  cardiac: "bg-red-100 text-red-700",
  respiratory: "bg-blue-100 text-blue-700",
  infectious: "bg-yellow-100 text-yellow-700",
  injury: "bg-orange-100 text-orange-700",
  poisoning: "bg-purple-100 text-purple-700",
  pediatric: "bg-pink-100 text-pink-700",
  other: "bg-gray-100 text-gray-700",
  neurological: "bg-violet-100 text-violet-700",
  metabolic: "bg-green-100 text-green-700",
  mental: "bg-indigo-100 text-indigo-700",
  digestive: "bg-amber-100 text-amber-700",
};

const DiseaseCard = ({ disease }: DiseaseCardProps) => {
  const { language } = useLanguage();
  const name = diseaseNames[language]?.[disease.id] || diseaseNames["en"][disease.id];

  return (
    <Link
      to={`/condition/${disease.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-3xl shadow-sm">
          {disease.icon}
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${categoryColors[disease.category]}`}>
          {categoryIcons[disease.category]}
          <span className="capitalize">{disease.category}</span>
        </div>
      </div>
      
      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
        {name}
      </h3>
      
      <p className="text-sm text-muted-foreground truncate mb-4 flex-grow">
        {disease.symptoms[0]}
      </p>

      {/* Stats */}
      <div className="flex gap-3 mb-4 pb-4 border-b border-border/50">
        <div className="text-xs">
          <span className="font-semibold text-foreground">{disease.symptoms.length}</span>
          <span className="text-muted-foreground"> symptoms</span>
        </div>
        <div className="text-xs">
          <span className="font-semibold text-foreground">{disease.immediateActions.length}</span>
          <span className="text-muted-foreground"> actions</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary">Learn more</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default DiseaseCard;
