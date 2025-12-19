import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlatformCardProps {
  name: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "connecting";
  followers?: string;
  lastPost?: string;
  color: string;
  onConnect?: () => void;
}

export function PlatformCard({
  name,
  icon,
  status,
  followers,
  lastPost,
  color,
  onConnect,
}: PlatformCardProps) {
  return (
    <div className="glass-card p-5 hover:border-primary/30 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
              color
            )}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            {status === "connected" && followers && (
              <p className="text-sm text-muted-foreground">{followers} followers</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {status === "connected" && (
            <span className="flex items-center gap-1 text-neon-green text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Connected
            </span>
          )}
          {status === "disconnected" && (
            <Button variant="neon-outline" size="sm" onClick={onConnect}>
              Connect
            </Button>
          )}
          {status === "connecting" && (
            <span className="flex items-center gap-1 text-neon-orange text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting...
            </span>
          )}
        </div>
      </div>
      
      {status === "connected" && lastPost && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">Last post: {lastPost}</p>
        </div>
      )}
    </div>
  );
}
