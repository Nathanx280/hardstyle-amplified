import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduledPost {
  id: string;
  platform: string;
  platformColor: string;
  title: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "pending" | "paused" | "completed";
}

const mockSchedule: ScheduledPost[] = [
  {
    id: "1",
    platform: "X",
    platformColor: "bg-foreground",
    title: "New Hardstyle Mega Mix #5 is LIVE! 🔥",
    scheduledDate: "2025-01-19",
    scheduledTime: "18:00",
    status: "pending",
  },
  {
    id: "2",
    platform: "TikTok",
    platformColor: "bg-foreground",
    title: "30s teaser clip - Euphoric drops",
    scheduledDate: "2025-01-19",
    scheduledTime: "20:00",
    status: "pending",
  },
  {
    id: "3",
    platform: "Reddit",
    platformColor: "bg-orange-600",
    title: "r/hardstyle - New mix discussion",
    scheduledDate: "2025-01-20",
    scheduledTime: "10:00",
    status: "paused",
  },
  {
    id: "4",
    platform: "Instagram",
    platformColor: "bg-gradient-to-br from-purple-600 to-pink-500",
    title: "Reel: Best moments compilation",
    scheduledDate: "2025-01-20",
    scheduledTime: "14:00",
    status: "pending",
  },
  {
    id: "5",
    platform: "X",
    platformColor: "bg-foreground",
    title: "Follow-up engagement tweet",
    scheduledDate: "2025-01-21",
    scheduledTime: "12:00",
    status: "pending",
  },
];

const timeSlots = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(mockSchedule);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "list">("week");

  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getPostsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return schedule.filter((post) => post.scheduledDate === dateStr);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const togglePostStatus = (id: string) => {
    setSchedule((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              status: post.status === "paused" ? "pending" : "paused",
            }
          : post
      )
    );
  };

  const deletePost = (id: string) => {
    setSchedule((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <MainLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
            <p className="text-muted-foreground mt-1">
              Manage your upcoming posts and schedule new content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
              <Button
                variant={view === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("week")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Week
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
              >
                List
              </Button>
            </div>
            <Button variant="neon">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
          </div>
        </div>

        {view === "week" ? (
          <>
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateWeek("prev")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold text-foreground">
                  {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateWeek("next")}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>

            {/* Week Calendar */}
            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-7 border-b border-border/50">
                {weekDates.map((date, index) => {
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-4 text-center border-r border-border/30 last:border-r-0",
                        isToday && "bg-primary/10"
                      )}
                    >
                      <p className="text-sm text-muted-foreground">
                        {weekDays[date.getDay()]}
                      </p>
                      <p
                        className={cn(
                          "text-lg font-semibold mt-1",
                          isToday ? "text-primary" : "text-foreground"
                        )}
                      >
                        {date.getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-7 min-h-96">
                {weekDates.map((date, index) => {
                  const posts = getPostsForDate(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-2 border-r border-border/30 last:border-r-0 min-h-48",
                        isToday && "bg-primary/5"
                      )}
                    >
                      <div className="space-y-2">
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className={cn(
                              "p-2 rounded-lg text-xs transition-all duration-300 cursor-pointer hover:scale-105",
                              post.status === "paused"
                                ? "bg-muted/50 opacity-60"
                                : "bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/30"
                            )}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <div
                                className={cn(
                                  "w-4 h-4 rounded text-white flex items-center justify-center text-[8px]",
                                  post.platformColor
                                )}
                              >
                                {post.platform[0]}
                              </div>
                              <span className="text-muted-foreground">
                                {post.scheduledTime}
                              </span>
                            </div>
                            <p className="text-foreground line-clamp-2 font-medium">
                              {post.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* List View */
          <div className="glass-card overflow-hidden">
            <div className="p-5 border-b border-border/50">
              <h3 className="font-semibold text-lg text-foreground">
                All Scheduled Posts
              </h3>
              <p className="text-sm text-muted-foreground">
                {schedule.length} posts scheduled
              </p>
            </div>

            <div className="divide-y divide-border/30">
              {schedule.map((post, index) => (
                <div
                  key={post.id}
                  className="p-4 hover:bg-secondary/30 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold",
                          post.platformColor
                        )}
                      >
                        {post.platform[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.scheduledDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.scheduledTime}
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              post.status === "pending" &&
                                "bg-neon-cyan/20 text-neon-cyan",
                              post.status === "paused" &&
                                "bg-muted text-muted-foreground",
                              post.status === "completed" &&
                                "bg-neon-green/20 text-neon-green"
                            )}
                          >
                            {post.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => togglePostStatus(post.id)}
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
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimal Posting Times */}
        <div className="mt-8 glass-card p-6">
          <h3 className="font-semibold text-lg text-foreground mb-4">
            AI-Optimized Posting Times
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your audience activity patterns
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { platform: "X", time: "6:00 PM", engagement: "High" },
              { platform: "TikTok", time: "8:00 PM", engagement: "Peak" },
              { platform: "Reddit", time: "10:00 AM", engagement: "Medium" },
              { platform: "Instagram", time: "2:00 PM", engagement: "High" },
            ].map((item) => (
              <div
                key={item.platform}
                className="p-4 rounded-lg bg-secondary/50 border border-border/50"
              >
                <p className="font-medium text-foreground">{item.platform}</p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {item.time}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.engagement} engagement
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
