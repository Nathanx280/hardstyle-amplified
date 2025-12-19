import { Youtube, ExternalLink, RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChannelStatusProps {
  channelName: string;
  subscriberCount: string;
  videoCount: number;
  latestVideo?: {
    title: string;
    thumbnail: string;
    views: string;
    uploadedAt: string;
  };
  isMonitoring: boolean;
  onRefresh?: () => void;
  onToggleMonitoring?: () => void;
}

export function ChannelStatus({
  channelName,
  subscriberCount,
  videoCount,
  latestVideo,
  isMonitoring,
  onRefresh,
  onToggleMonitoring,
}: ChannelStatusProps) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-red-600/20 to-red-600/5 border-b border-red-600/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{channelName}</h3>
              <p className="text-sm text-muted-foreground">{subscriberCount} subscribers</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant={isMonitoring ? "neon" : "outline"}
              size="sm"
              onClick={onToggleMonitoring}
            >
              <Bell className="w-4 h-4 mr-2" />
              {isMonitoring ? "Monitoring" : "Start Monitoring"}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 p-5 border-b border-border/50">
        <div>
          <p className="text-2xl font-bold text-foreground">{videoCount}</p>
          <p className="text-sm text-muted-foreground">Total Videos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-neon-green">Active</p>
          <p className="text-sm text-muted-foreground">Channel Status</p>
        </div>
      </div>

      {/* Latest Video */}
      {latestVideo && (
        <div className="p-5">
          <p className="text-sm font-medium text-muted-foreground mb-3">Latest Upload</p>
          <div className="flex gap-4">
            <img
              src={latestVideo.thumbnail}
              alt={latestVideo.title}
              className="w-32 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm line-clamp-2">
                {latestVideo.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {latestVideo.views} views · {latestVideo.uploadedAt}
              </p>
              <Button variant="link" className="h-auto p-0 mt-2 text-xs">
                <ExternalLink className="w-3 h-3 mr-1" />
                View on YouTube
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
