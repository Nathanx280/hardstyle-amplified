import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Youtube,
  Link2,
  RefreshCw,
  Bell,
  CheckCircle2,
  AlertCircle,
  Play,
  Eye,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  likes: string;
  comments: string;
  uploadedAt: string;
  promoted: boolean;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Hardstyle Mega Mix #5 | Euphoric & Raw Kicks 2025 🔥",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop",
    views: "1.2K",
    likes: "89",
    comments: "23",
    uploadedAt: "2 hours ago",
    promoted: true,
  },
  {
    id: "2",
    title: "Hardstyle Mega Mix #4 | Best of 2024 Euphoric Edition",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
    views: "3.4K",
    likes: "245",
    comments: "67",
    uploadedAt: "1 week ago",
    promoted: true,
  },
  {
    id: "3",
    title: "Hardstyle Mega Mix #3 | Raw Power & Reverse Bass",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=225&fit=crop",
    views: "5.1K",
    likes: "312",
    comments: "89",
    uploadedAt: "2 weeks ago",
    promoted: true,
  },
  {
    id: "4",
    title: "Hardstyle Mega Mix #2 | Festival Anthems Compilation",
    thumbnail: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&h=225&fit=crop",
    views: "4.8K",
    likes: "287",
    comments: "72",
    uploadedAt: "3 weeks ago",
    promoted: false,
  },
];

export default function YouTubePage() {
  const [isConnected, setIsConnected] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [channelUrl, setChannelUrl] = useState("https://youtube.com/@HardstyleMegaMixes");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleConnect = () => {
    if (!channelUrl) {
      toast({
        title: "Error",
        description: "Please enter your YouTube channel URL",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Success",
      description: "YouTube channel connected successfully!",
    });
    setIsConnected(true);
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Checking for new videos...",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">YouTube Integration</h1>
            <p className="text-muted-foreground mt-1">
              Connect and monitor your YouTube channel for new uploads
            </p>
          </div>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Connection Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Connection Card */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Channel Status</h3>
                  <p className={`text-sm ${isConnected ? "text-neon-green" : "text-muted-foreground"}`}>
                    {isConnected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="channel-url">Channel URL</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="channel-url"
                      placeholder="https://youtube.com/@yourchannel"
                      value={channelUrl}
                      onChange={(e) => setChannelUrl(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Link2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="api-key">YouTube API Key (Optional)</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="AIza..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    For faster updates. Uses RSS feed if not provided.
                  </p>
                </div>

                {!isConnected && (
                  <Button variant="neon" className="w-full" onClick={handleConnect}>
                    Connect Channel
                  </Button>
                )}
              </div>
            </div>

            {/* Monitoring Settings */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Monitoring Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Auto-detect new uploads</p>
                      <p className="text-xs text-muted-foreground">Monitor 24/7 for new videos</p>
                    </div>
                  </div>
                  <Switch
                    checked={isMonitoring}
                    onCheckedChange={setIsMonitoring}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Auto-promote new videos</p>
                      <p className="text-xs text-muted-foreground">Automatically create posts</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              {isMonitoring && (
                <div className="mt-4 p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                    <span className="text-sm text-neon-green font-medium">
                      Monitoring active
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Checking every 5 minutes
                  </p>
                </div>
              )}
            </div>

            {/* Channel Stats */}
            {isConnected && (
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Channel Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">2.1K</p>
                    <p className="text-sm text-muted-foreground">Subscribers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Videos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">45.2K</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neon-green">+12%</p>
                    <p className="text-sm text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Videos List */}
          <div className="lg:col-span-2">
            <div className="glass-card overflow-hidden">
              <div className="p-5 border-b border-border/50">
                <h3 className="font-semibold text-lg text-foreground">Recent Videos</h3>
                <p className="text-sm text-muted-foreground">
                  {mockVideos.length} videos found
                </p>
              </div>

              <div className="divide-y divide-border/30">
                {mockVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="p-4 hover:bg-secondary/30 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-40 h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white">
                          1:23:45
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground line-clamp-2 mb-2">
                          {video.title}
                        </h4>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {video.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {video.comments}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Uploaded {video.uploadedAt}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {video.promoted ? (
                              <span className="flex items-center gap-1 text-neon-green text-xs">
                                <CheckCircle2 className="w-4 h-4" />
                                Promoted
                              </span>
                            ) : (
                              <Button variant="neon-outline" size="sm">
                                Promote Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
