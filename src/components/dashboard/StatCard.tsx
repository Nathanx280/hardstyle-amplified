import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  accentColor?: "cyan" | "magenta" | "orange" | "green";
}

const accentStyles = {
  cyan: "from-neon-cyan/20 to-transparent border-neon-cyan/30 before:bg-gradient-to-r before:from-neon-cyan before:to-neon-cyan/50",
  magenta: "from-neon-magenta/20 to-transparent border-neon-magenta/30 before:bg-gradient-to-r before:from-neon-magenta before:to-neon-magenta/50",
  orange: "from-neon-orange/20 to-transparent border-neon-orange/30 before:bg-gradient-to-r before:from-neon-orange before:to-neon-orange/50",
  green: "from-neon-green/20 to-transparent border-neon-green/30 before:bg-gradient-to-r before:from-neon-green before:to-neon-green/50",
};

const iconStyles = {
  cyan: "bg-neon-cyan/20 text-neon-cyan",
  magenta: "bg-neon-magenta/20 text-neon-magenta",
  orange: "bg-neon-orange/20 text-neon-orange",
  green: "bg-neon-green/20 text-neon-green",
};

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  accentColor = "cyan",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "stat-card bg-gradient-to-br border",
        accentStyles[accentColor]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm mt-2 font-medium",
                changeType === "positive" && "text-neon-green",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconStyles[accentColor])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
