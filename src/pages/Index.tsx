import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { PlatformCard } from "@/components/dashboard/PlatformCard";
import { PostQueue } from "@/components/dashboard/PostQueue";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ChannelStatus } from "@/components/dashboard/ChannelStatus";
import { Button } from "@/components/ui/button";
import {
  Youtube,
  Users,
  TrendingUp,
  Clock,
  Send,
  Play,
} from "lucide-react";

// Platform icons
const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const RedditIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const mockPlatforms = [
  {
    name: "X (Twitter)",
    icon: <TwitterIcon />,
    status: "connected" as const,
    followers: "1.2K",
    lastPost: "2 hours ago",
    color: "bg-foreground text-background",
  },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    status: "disconnected" as const,
    color: "bg-gradient-to-br from-purple-600 to-pink-500 text-white",
  },
  {
    name: "TikTok",
    icon: <TikTokIcon />,
    status: "connected" as const,
    followers: "5.4K",
    lastPost: "4 hours ago",
    color: "bg-foreground text-background",
  },
  {
    name: "Reddit",
    icon: <RedditIcon />,
    status: "connected" as const,
    followers: "890",
    lastPost: "6 hours ago",
    color: "bg-orange-600 text-white",
  },
];

const mockQueuedPosts = [
  {
    id: "1",
    platform: "X",
    platformIcon: <TwitterIcon />,
    platformColor: "bg-foreground text-background",
    title: "New Hardstyle Mega Mix #5 is LIVE! 🔥",
    scheduledTime: "Today, 6:00 PM",
    status: "pending" as const,
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=120&fit=crop",
  },
  {
    id: "2",
    platform: "TikTok",
    platformIcon: <TikTokIcon />,
    platformColor: "bg-foreground text-background",
    title: "30s teaser clip - Euphoric drops",
    scheduledTime: "Today, 8:00 PM",
    status: "pending" as const,
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=120&fit=crop",
  },
  {
    id: "3",
    platform: "Reddit",
    platformIcon: <RedditIcon />,
    platformColor: "bg-orange-600 text-white",
    title: "r/hardstyle - New mix discussion",
    scheduledTime: "Tomorrow, 10:00 AM",
    status: "paused" as const,
  },
];

const mockActivities = [
  {
    id: "1",
    type: "success" as const,
    message: "Posted to X successfully",
    time: "2 minutes ago",
    platform: "X",
  },
  {
    id: "2",
    type: "info" as const,
    message: "New video detected: Hardstyle Mega Mix #5",
    time: "15 minutes ago",
  },
  {
    id: "3",
    type: "success" as const,
    message: "Posted to r/hardstyle",
    time: "2 hours ago",
    platform: "Reddit",
  },
  {
    id: "4",
    type: "pending" as const,
    message: "Generating teaser clip...",
    time: "2 hours ago",
  },
  {
    id: "5",
    type: "error" as const,
    message: "Instagram API rate limit reached",
    time: "4 hours ago",
    platform: "Instagram",
  },
];

export default function Index() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your cross-platform promotions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
          <Button variant="neon">
            <Send className="w-4 h-4 mr-2" />
            Post Now
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Posts"
          value="127"
          change="+12 this week"
          changeType="positive"
          icon={Send}
          accentColor="cyan"
        />
        <StatCard
          title="Total Reach"
          value="45.2K"
          change="+23% vs last week"
          changeType="positive"
          icon={Users}
          accentColor="magenta"
        />
        <StatCard
          title="Engagement Rate"
          value="8.4%"
          change="+1.2% improvement"
          changeType="positive"
          icon={TrendingUp}
          accentColor="green"
        />
        <StatCard
          title="Scheduled"
          value="8"
          change="Next in 2 hours"
          changeType="neutral"
          icon={Clock}
          accentColor="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Channel Status & Platforms */}
        <div className="lg:col-span-2 space-y-6">
          {/* YouTube Channel Status */}
          <ChannelStatus
            channelName="Hardstyle Mega Mixes"
            subscriberCount="2.1K"
            videoCount={24}
            isMonitoring={true}
            latestVideo={{
              title: "Hardstyle Mega Mix #5 | Euphoric & Raw Kicks 2025 🔥",
              thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop",
              views: "1.2K",
              uploadedAt: "2 hours ago",
            }}
          />

          {/* Connected Platforms */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Connected Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPlatforms.map((platform) => (
                <PlatformCard key={platform.name} {...platform} />
              ))}
            </div>
          </div>

          {/* Post Queue */}
          <PostQueue posts={mockQueuedPosts} />
        </div>

        {/* Right Column - Activity Feed */}
        <div className="space-y-6">
          <ActivityFeed activities={mockActivities} />
          
          {/* Quick Actions */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Play className="w-4 h-4 mr-2" />
                Resume All Paused Posts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Youtube className="w-4 h-4 mr-2 text-red-500" />
                Check for New Videos
              </Button>
              <Button variant="outline" className="w-full justify-start text-neon-cyan">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
