import { CheckCircle2, AlertCircle, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "success" | "error" | "pending" | "info";
  message: string;
  time: string;
  platform?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  pending: Clock,
  info: Zap,
};

const colorMap = {
  success: "text-neon-green bg-neon-green/20",
  error: "text-destructive bg-destructive/20",
  pending: "text-neon-orange bg-neon-orange/20",
  info: "text-neon-cyan bg-neon-cyan/20",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <h3 className="font-semibold text-lg text-foreground">Recent Activity</h3>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <div className="divide-y divide-border/30">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            return (
              <div
                key={activity.id}
                className="p-4 hover:bg-secondary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg", colorMap[activity.type])}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {activity.platform && (
                        <span className="text-xs text-primary">{activity.platform}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
