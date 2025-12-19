import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Key,
  Bell,
  Shield,
  Palette,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ApiKey {
  id: string;
  name: string;
  platform: string;
  isSet: boolean;
  lastUpdated?: string;
}

const apiKeys: ApiKey[] = [
  {
    id: "youtube",
    name: "YouTube Data API",
    platform: "YouTube",
    isSet: true,
    lastUpdated: "2 days ago",
  },
  {
    id: "twitter",
    name: "X API Bearer Token",
    platform: "X (Twitter)",
    isSet: true,
    lastUpdated: "1 week ago",
  },
  {
    id: "tiktok",
    name: "TikTok API Key",
    platform: "TikTok",
    isSet: true,
    lastUpdated: "3 days ago",
  },
  {
    id: "reddit",
    name: "Reddit OAuth Credentials",
    platform: "Reddit",
    isSet: true,
    lastUpdated: "5 days ago",
  },
  {
    id: "instagram",
    name: "Instagram Graph API",
    platform: "Instagram",
    isSet: false,
  },
];

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your PromoBot preferences and API connections
          </p>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl">
            <TabsTrigger value="api-keys" className="gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg text-foreground mb-2">
                API Credentials
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Securely manage your platform API keys and tokens
              </p>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            key.isSet
                              ? "bg-neon-green/20 text-neon-green"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {key.isSet ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <AlertCircle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{key.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {key.platform}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {key.isSet && key.lastUpdated && (
                          <span className="text-xs text-muted-foreground">
                            Updated {key.lastUpdated}
                          </span>
                        )}
                        <Button variant="outline" size="sm">
                          {key.isSet ? "Update" : "Add Key"}
                        </Button>
                      </div>
                    </div>

                    {showApiKey === key.id && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="flex gap-2">
                          <Input
                            type="password"
                            placeholder="Enter API key..."
                            className="font-mono text-sm"
                          />
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
                <p className="text-sm text-neon-cyan font-medium">
                  🔒 All API keys are encrypted and stored securely
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Keys are never exposed in logs or transmitted insecurely
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg text-foreground mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-6">
                {[
                  {
                    title: "New Video Detected",
                    description: "Get notified when a new YouTube video is found",
                    defaultChecked: true,
                  },
                  {
                    title: "Post Published",
                    description: "Notify when a scheduled post goes live",
                    defaultChecked: true,
                  },
                  {
                    title: "Post Failed",
                    description: "Alert when a post fails to publish",
                    defaultChecked: true,
                  },
                  {
                    title: "Engagement Milestones",
                    description: "Celebrate when posts hit engagement goals",
                    defaultChecked: false,
                  },
                  {
                    title: "Weekly Summary",
                    description: "Receive a weekly performance report",
                    defaultChecked: true,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-border/30 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Email Notifications
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Notification Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg text-foreground mb-6">
                Security Settings
              </h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <div>
                    <p className="font-medium text-foreground">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <div>
                    <p className="font-medium text-foreground">
                      Session Timeout
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      API Rate Limiting
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Prevent abuse by limiting API requests
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg text-foreground mb-4">
                Active Sessions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium text-foreground">Current Session</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome on macOS • Active now
                    </p>
                  </div>
                  <span className="text-xs text-neon-green">Active</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-lg text-foreground mb-6">
                Theme Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Color Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: "Neon", colors: ["bg-neon-cyan", "bg-neon-magenta"] },
                      { name: "Ocean", colors: ["bg-blue-500", "bg-teal-500"] },
                      { name: "Sunset", colors: ["bg-orange-500", "bg-pink-500"] },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-300",
                          theme.name === "Neon"
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex gap-2 mb-2">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className={cn("w-6 h-6 rounded-full", color)}
                            />
                          ))}
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {theme.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Reduce Animations</p>
                    <p className="text-sm text-muted-foreground">
                      Minimize motion for accessibility
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Show more content with less spacing
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
