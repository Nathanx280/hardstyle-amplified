import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointerClick,
  Heart,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const engagementData = [
  { name: "Mon", views: 1200, clicks: 340, engagement: 180 },
  { name: "Tue", views: 1800, clicks: 520, engagement: 290 },
  { name: "Wed", views: 2200, clicks: 680, engagement: 420 },
  { name: "Thu", views: 1600, clicks: 410, engagement: 220 },
  { name: "Fri", views: 2800, clicks: 890, engagement: 560 },
  { name: "Sat", views: 3200, clicks: 1100, engagement: 720 },
  { name: "Sun", views: 2400, clicks: 780, engagement: 480 },
];

const platformData = [
  { name: "X", value: 35, color: "#00D9FF" },
  { name: "TikTok", value: 30, color: "#FF2D92" },
  { name: "Reddit", value: 20, color: "#FF6B35" },
  { name: "Instagram", value: 15, color: "#00FF88" },
];

const topPosts = [
  {
    platform: "X",
    title: "Hardstyle Mega Mix #5 🔥",
    views: "12.4K",
    engagement: "8.2%",
    trend: "up",
  },
  {
    platform: "TikTok",
    title: "30s teaser - Euphoric drops",
    views: "45.2K",
    engagement: "12.1%",
    trend: "up",
  },
  {
    platform: "Reddit",
    title: "r/hardstyle discussion",
    views: "2.1K",
    engagement: "15.3%",
    trend: "up",
  },
  {
    platform: "X",
    title: "Mix #4 reminder",
    views: "5.6K",
    engagement: "4.8%",
    trend: "down",
  },
];

const stats = [
  {
    title: "Total Impressions",
    value: "156.2K",
    change: "+24.5%",
    trend: "up",
    icon: Eye,
    color: "cyan",
  },
  {
    title: "Total Clicks",
    value: "8,432",
    change: "+18.2%",
    trend: "up",
    icon: MousePointerClick,
    color: "magenta",
  },
  {
    title: "Avg. Engagement",
    value: "9.4%",
    change: "+2.1%",
    trend: "up",
    icon: Heart,
    color: "green",
  },
  {
    title: "New Followers",
    value: "+847",
    change: "+12.8%",
    trend: "up",
    icon: Users,
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  cyan: "text-neon-cyan bg-neon-cyan/20",
  magenta: "text-neon-magenta bg-neon-magenta/20",
  green: "text-neon-green bg-neon-green/20",
  orange: "text-neon-orange bg-neon-orange/20",
};

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your cross-platform performance and engagement
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="7d">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="glass-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-neon-green" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        stat.trend === "up"
                          ? "text-neon-green"
                          : "text-destructive"
                      )}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      vs last week
                    </span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-xl", colorMap[stat.color])}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engagement Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-semibold text-lg text-foreground mb-6">
              Engagement Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(186, 100%, 50%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(186, 100%, 50%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(328, 100%, 60%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(328, 100%, 60%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220, 15%, 20%)"
                />
                <XAxis
                  dataKey="name"
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 18%, 10%)",
                    border: "1px solid hsl(220, 15%, 20%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(186, 100%, 50%)"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="hsl(328, 100%, 60%)"
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-cyan" />
                <span className="text-sm text-muted-foreground">Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-magenta" />
                <span className="text-sm text-muted-foreground">Clicks</span>
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg text-foreground mb-6">
              Platform Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 18%, 10%)",
                    border: "1px solid hsl(220, 15%, 20%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-4">
              {platformData.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-sm text-foreground">
                      {platform.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {platform.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="mt-6 glass-card overflow-hidden">
          <div className="p-5 border-b border-border/50">
            <h3 className="font-semibold text-lg text-foreground">
              Top Performing Posts
            </h3>
          </div>

          <div className="divide-y divide-border/30">
            {topPosts.map((post, index) => (
              <div
                key={index}
                className="p-4 hover:bg-secondary/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">
                      {post.platform[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{post.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.platform}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="font-medium text-foreground">{post.views}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {post.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-neon-green" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                        <span
                          className={cn(
                            "font-medium",
                            post.trend === "up"
                              ? "text-neon-green"
                              : "text-destructive"
                          )}
                        >
                          {post.engagement}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
