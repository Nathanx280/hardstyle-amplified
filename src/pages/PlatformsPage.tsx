import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Link2,
  Settings,
  Clock,
  Hash,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Platform icons
const TwitterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const RedditIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "connecting";
  color: string;
  bgColor: string;
  followers?: string;
  enabled: boolean;
  defaultHashtags: string[];
  postInterval: number;
}

const initialPlatforms: Platform[] = [
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: <TwitterIcon />,
    status: "connected",
    color: "text-foreground",
    bgColor: "bg-foreground",
    followers: "1.2K",
    enabled: true,
    defaultHashtags: ["#Hardstyle", "#HardstyleMix", "#EDM", "#Hardstyle2025"],
    postInterval: 4,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <InstagramIcon />,
    status: "disconnected",
    color: "text-pink-500",
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-500",
    enabled: false,
    defaultHashtags: ["#hardstyle", "#edm", "#rave", "#hardstylemusic"],
    postInterval: 6,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <TikTokIcon />,
    status: "connected",
    color: "text-foreground",
    bgColor: "bg-foreground",
    followers: "5.4K",
    enabled: true,
    defaultHashtags: ["#hardstyle", "#edm", "#rave", "#fyp"],
    postInterval: 4,
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: <RedditIcon />,
    status: "connected",
    color: "text-orange-500",
    bgColor: "bg-orange-600",
    followers: "890",
    enabled: true,
    defaultHashtags: [],
    postInterval: 8,
  },
];

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("twitter");
  const { toast } = useToast();

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform);

  const handleConnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === platformId ? { ...p, status: "connecting" as const } : p
      )
    );

    // Simulate connection
    setTimeout(() => {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === platformId
            ? { ...p, status: "connected" as const, enabled: true, followers: "0" }
            : p
        )
      );
      toast({
        title: "Success",
        description: `Connected to ${platforms.find((p) => p.id === platformId)?.name}!`,
      });
    }, 2000);
  };

  const handleToggle = (platformId: string, enabled: boolean) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === platformId ? { ...p, enabled } : p))
    );
  };

  return (
    <MainLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Platforms</h1>
          <p className="text-muted-foreground mt-1">
            Connect and configure your social media platforms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform List */}
          <div className="space-y-4">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={cn(
                  "w-full glass-card p-4 text-left transition-all duration-300",
                  selectedPlatform === platform.id
                    ? "border-primary/50 neon-glow"
                    : "hover:border-primary/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                        platform.bgColor
                      )}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{platform.name}</h3>
                      {platform.status === "connected" && platform.followers && (
                        <p className="text-sm text-muted-foreground">
                          {platform.followers} followers
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {platform.status === "connected" && (
                      <CheckCircle2 className="w-5 h-5 text-neon-green" />
                    )}
                    {platform.status === "disconnected" && (
                      <XCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                    {platform.status === "connecting" && (
                      <Loader2 className="w-5 h-5 text-neon-orange animate-spin" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Platform Settings */}
          <div className="lg:col-span-2">
            {currentPlatform && (
              <div className="glass-card overflow-hidden">
                {/* Platform Header */}
                <div
                  className={cn(
                    "p-6 border-b border-border/50",
                    currentPlatform.status === "connected"
                      ? "bg-gradient-to-r from-neon-green/10 to-transparent"
                      : "bg-gradient-to-r from-muted/30 to-transparent"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center text-white",
                          currentPlatform.bgColor
                        )}
                      >
                        {currentPlatform.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">
                          {currentPlatform.name}
                        </h2>
                        <p
                          className={cn(
                            "text-sm",
                            currentPlatform.status === "connected"
                              ? "text-neon-green"
                              : "text-muted-foreground"
                          )}
                        >
                          {currentPlatform.status === "connected"
                            ? "Connected"
                            : currentPlatform.status === "connecting"
                            ? "Connecting..."
                            : "Not connected"}
                        </p>
                      </div>
                    </div>

                    {currentPlatform.status === "disconnected" && (
                      <Button
                        variant="neon"
                        onClick={() => handleConnect(currentPlatform.id)}
                      >
                        <Link2 className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    )}

                    {currentPlatform.status === "connecting" && (
                      <Button variant="outline" disabled>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </Button>
                    )}
                  </div>
                </div>

                {/* Settings Tabs */}
                {currentPlatform.status === "connected" && (
                  <Tabs defaultValue="general" className="p-6">
                    <TabsList className="mb-6">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                        <div>
                          <p className="font-medium text-foreground">
                            Enable Auto-posting
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Automatically post when new videos are detected
                          </p>
                        </div>
                        <Switch
                          checked={currentPlatform.enabled}
                          onCheckedChange={(checked) =>
                            handleToggle(currentPlatform.id, checked)
                          }
                        />
                      </div>

                      <div>
                        <Label>API Credentials</Label>
                        <div className="mt-2 p-4 rounded-lg bg-secondary/30 border border-border/50">
                          <div className="flex items-center gap-2 text-neon-green text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>API credentials configured</span>
                          </div>
                          <Button variant="link" className="p-0 h-auto mt-2 text-xs">
                            <Settings className="w-3 h-3 mr-1" />
                            Update credentials
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="content" className="space-y-6">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          Default Hashtags
                        </Label>
                        <Input
                          className="mt-2"
                          defaultValue={currentPlatform.defaultHashtags.join(" ")}
                          placeholder="#hardstyle #edm #rave"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          These hashtags will be added to every post
                        </p>
                      </div>

                      <div>
                        <Label>Post Template</Label>
                        <textarea
                          className="mt-2 w-full min-h-32 p-3 rounded-lg bg-secondary/50 border border-border text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue="🔥 New Hardstyle Mega Mix just dropped!

{video_title}

Check it out: {video_link}

{hashtags}"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="schedule" className="space-y-6">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Minimum Post Interval
                        </Label>
                        <div className="mt-2 flex items-center gap-4">
                          <Input
                            type="number"
                            defaultValue={currentPlatform.postInterval}
                            className="w-24"
                            min={1}
                            max={24}
                          />
                          <span className="text-muted-foreground">hours</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Wait at least this long between posts to avoid spam flags
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                        <p className="text-sm text-neon-orange font-medium">
                          Rate Limit Protection Active
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Posts will be spaced out to comply with platform limits
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                {currentPlatform.status === "disconnected" && (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <Link2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Connect {currentPlatform.name}
                    </h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Connect your {currentPlatform.name} account to start
                      auto-posting your YouTube videos
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
