import { Clock, Play, Pause, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QueuedPost {
  id: string;
  platform: string;
  platformIcon: React.ReactNode;
  platformColor: string;
  title: string;
  scheduledTime: string;
  status: "pending" | "processing" | "paused";
  thumbnail?: string;
}

interface PostQueueProps {
  posts: QueuedPost[];
  onPause?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PostQueue({ posts, onPause, onDelete }: PostQueueProps) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-foreground">Scheduled Posts</h3>
          <span className="text-sm text-muted-foreground">{posts.length} in queue</span>
        </div>
      </div>
      
      <div className="divide-y divide-border/30">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="p-4 hover:bg-secondary/30 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt=""
                  className="w-16 h-10 object-cover rounded-lg"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn("w-6 h-6 rounded flex items-center justify-center", post.platformColor)}>
                    {post.platformIcon}
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">
                    {post.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{post.scheduledTime}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    post.status === "pending" && "bg-neon-cyan/20 text-neon-cyan",
                    post.status === "processing" && "bg-neon-orange/20 text-neon-orange",
                    post.status === "paused" && "bg-muted text-muted-foreground"
                  )}>
                    {post.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onPause?.(post.id)}
                >
                  {post.status === "paused" ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => onDelete?.(post.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No posts scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
