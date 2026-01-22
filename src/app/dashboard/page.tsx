"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  MapPin,
  BarChart3,
  ChefHat,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Thermometer,
  Wind,
  Droplets,
  TrendingUp,
  TrendingDown,
  Package,
  Utensils,
  Wine,
  Coffee,
  Leaf,
  Shield,
  HandMetal,
  Timer,
  QrCode,
  Smartphone,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
  RefreshCw,
  Bell,
  Settings,
  Activity,
  HardHat,
  Flame,
  Zap,
  Eye,
  FileWarning,
  ClipboardCheck,
  UserCheck,
  AlertOctagon,
  CircleAlert,
  BadgeCheck,
  Camera,
  MessageSquareWarning,
  ShieldAlert,
  Siren,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const revenueData = [
  { time: "09:00", shipyard: 2400, vip: 4200, waterside: 1800 },
  { time: "10:00", shipyard: 3200, vip: 5100, waterside: 2400 },
  { time: "11:00", shipyard: 4100, vip: 6800, waterside: 3200 },
  { time: "12:00", shipyard: 6200, vip: 9400, waterside: 4800 },
  { time: "13:00", shipyard: 7800, vip: 11200, waterside: 5600 },
  { time: "14:00", shipyard: 6400, vip: 8900, waterside: 4200 },
  { time: "15:00", shipyard: 5200, vip: 7600, waterside: 3800 },
];

const categoryData = [
  { name: "Beverages", value: 42, colour: "#0ea5e9" },
  { name: "Hot Food", value: 28, colour: "#c9a962" },
  { name: "Cold Food", value: 18, colour: "#22c55e" },
  { name: "Desserts", value: 12, colour: "#a855f7" },
];

const wasteData = [
  { category: "Seafood", waste: 2.3, target: 5 },
  { category: "Salads", waste: 4.1, target: 5 },
  { category: "Bread", waste: 3.8, target: 5 },
  { category: "Desserts", waste: 1.9, target: 5 },
  { category: "Beverages", waste: 0.8, target: 5 },
];

// AI Agent feed messages with food waste and hygiene focus
const agentFeedItems = [
  {
    id: 1,
    agent: "Waste Monitor",
    type: "success",
    message: "Seafood wastage reduced to 2.3% - below 5% target threshold",
    timestamp: "Just now",
    icon: Leaf,
  },
  {
    id: 2,
    agent: "Hygiene Agent",
    type: "alert",
    message: "Station 4 handwash compliance dropped to 78% - alerting supervisor",
    timestamp: "2 mins ago",
    icon: HandMetal,
  },
  {
    id: 3,
    agent: "Stock Agent",
    type: "action",
    message: "Triggering champagne reorder for Waterside Lounge - stock at 15%",
    timestamp: "5 mins ago",
    icon: Wine,
  },
  {
    id: 4,
    agent: "Hygiene Agent",
    type: "success",
    message: "All food handlers completed temperature checks - 100% compliance",
    timestamp: "8 mins ago",
    icon: Thermometer,
  },
  {
    id: 5,
    agent: "Waste Monitor",
    type: "info",
    message: "Predictive model suggests reducing salad prep by 20% for evening service",
    timestamp: "12 mins ago",
    icon: ChefHat,
  },
  {
    id: 6,
    agent: "Hygiene Agent",
    type: "success",
    message: "Kitchen deep clean completed - Zone A certified for service",
    timestamp: "15 mins ago",
    icon: Shield,
  },
  {
    id: 7,
    agent: "Stock Agent",
    type: "action",
    message: "Auto-ordered 50 portions of fish & chips - high demand predicted",
    timestamp: "18 mins ago",
    icon: Package,
  },
  {
    id: 8,
    agent: "Waste Monitor",
    type: "alert",
    message: "Bread wastage trending up - recommend reducing batch size by 30%",
    timestamp: "22 mins ago",
    icon: AlertTriangle,
  },
];

// Staff location data for geofencing map
const staffLocations = [
  { id: 1, name: "Sarah M.", role: "Floor Manager", zone: "VIP Lounge", x: 65, y: 25 },
  { id: 2, name: "James T.", role: "Chef", zone: "Main Kitchen", x: 30, y: 45 },
  { id: 3, name: "Emma W.", role: "Server", zone: "Waterside Bar", x: 80, y: 60 },
  { id: 4, name: "Michael R.", role: "Barista", zone: "Coffee Station", x: 45, y: 35 },
  { id: 5, name: "Lisa K.", role: "Server", zone: "Shipyard Deck", x: 20, y: 70 },
  { id: 6, name: "David P.", role: "Sommelier", zone: "VIP Lounge", x: 70, y: 30 },
  { id: 7, name: "Amy C.", role: "Chef", zone: "Prep Kitchen", x: 25, y: 50 },
  { id: 8, name: "Tom B.", role: "Runner", zone: "Loading Bay", x: 10, y: 80 },
];

// VIP QR Orders
const qrOrders = [
  { id: "VIP-001", table: "Platinum 3", items: ["2x Moët", "Seafood Platter"], status: "preparing", time: "3 mins" },
  { id: "VIP-002", table: "Gold 7", items: ["Afternoon Tea", "Prosecco"], status: "ready", time: "Ready" },
  { id: "VIP-003", table: "Platinum 1", items: ["Oysters (12)", "Chablis"], status: "delivered", time: "Delivered" },
  { id: "VIP-004", table: "Gold 2", items: ["Coffee Service", "Petit Fours"], status: "preparing", time: "5 mins" },
];

// SHEQ Hazard Reports
const hazardReports = [
  {
    id: "HAZ-001",
    type: "critical",
    category: "Slip Hazard",
    location: "Waterside Bar - Entrance",
    reporter: "Sarah M.",
    time: "3 mins ago",
    status: "responding",
    description: "Spillage near entrance causing slip risk",
    icon: AlertOctagon,
  },
  {
    id: "HAZ-002",
    type: "warning",
    category: "Equipment",
    location: "Main Kitchen - Station 2",
    reporter: "James T.",
    time: "12 mins ago",
    status: "investigating",
    description: "Fryer temperature gauge showing erratic readings",
    icon: Flame,
  },
  {
    id: "HAZ-003",
    type: "info",
    category: "Near Miss",
    location: "Loading Bay",
    reporter: "Tom B.",
    time: "25 mins ago",
    status: "logged",
    description: "Forklift near-miss with pedestrian - CCTV captured",
    icon: Eye,
  },
  {
    id: "HAZ-004",
    type: "resolved",
    category: "Electrical",
    location: "VIP Lounge - Bar Area",
    reporter: "David P.",
    time: "1 hour ago",
    status: "resolved",
    description: "Exposed cable under bar - taped and reported to maintenance",
    icon: Zap,
  },
];

// SHEQ Compliance Checks
const complianceChecks = [
  { area: "Fire Exits Clear", status: "passed", lastCheck: "09:15", nextDue: "13:15", checker: "Mike S." },
  { area: "First Aid Kits", status: "passed", lastCheck: "08:00", nextDue: "20:00", checker: "Lisa K." },
  { area: "PPE Availability", status: "warning", lastCheck: "10:30", nextDue: "14:30", checker: "Amy C." },
  { area: "Spill Kits Stocked", status: "passed", lastCheck: "08:30", nextDue: "16:30", checker: "Tom B." },
  { area: "COSHH Storage", status: "passed", lastCheck: "07:00", nextDue: "19:00", checker: "James T." },
];

// SHEQ Incident Statistics
const incidentStats = [
  { period: "Mon", hazards: 3, nearMisses: 1, incidents: 0 },
  { period: "Tue", hazards: 5, nearMisses: 2, incidents: 0 },
  { period: "Wed", hazards: 2, nearMisses: 0, incidents: 1 },
  { period: "Thu", hazards: 4, nearMisses: 1, incidents: 0 },
  { period: "Fri", hazards: 6, nearMisses: 3, incidents: 0 },
  { period: "Sat", hazards: 8, nearMisses: 2, incidents: 0 },
  { period: "Today", hazards: 4, nearMisses: 1, incidents: 0 },
];

// Risk Assessment Status
const riskAssessments = [
  { task: "Hot Food Service", riskLevel: "medium", lastReview: "01/09/2025", status: "current" },
  { task: "Glass Collection", riskLevel: "high", lastReview: "15/08/2025", status: "current" },
  { task: "Manual Handling - Kegs", riskLevel: "high", lastReview: "20/08/2025", status: "current" },
  { task: "Chemical Cleaning", riskLevel: "medium", lastReview: "25/07/2025", status: "review-due" },
  { task: "Outdoor Service - Pontoons", riskLevel: "high", lastReview: "01/09/2025", status: "current" },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [feedItems, setFeedItems] = useState(agentFeedItems);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live feed updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newMessages = [
        { agent: "Hygiene Agent", type: "success", message: "Handwash station restocked - Zone B", icon: HandMetal },
        { agent: "Waste Monitor", type: "info", message: "Diverting surplus bread to staff meals - zero waste", icon: Leaf },
        { agent: "Stock Agent", type: "action", message: "Emergency ice delivery en route - ETA 15 mins", icon: Package },
        { agent: "Hygiene Agent", type: "alert", message: "Temperature check due for cold storage unit 3", icon: Thermometer },
        { agent: "Waste Monitor", type: "success", message: "Daily waste target achieved - 3.2% overall", icon: CheckCircle2 },
      ];
      const randomMessage = newMessages[Math.floor(Math.random() * newMessages.length)];
      setFeedItems((prev) => [
        {
          id: Date.now(),
          ...randomMessage,
          timestamp: "Just now",
        },
        ...prev.slice(0, 7),
      ]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "alert":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "action":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen gradient-onyx">
      {/* Header */}
      <header className="border-b border-border glass sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <span className="font-bold text-gradient-gold">Command Centre</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Southampton Boat Show</div>
                <div className="text-lg font-semibold">
                  {currentTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {[
            { label: "Today's Revenue", value: "£47,832", change: "+12%", up: true, icon: TrendingUp },
            { label: "Active Staff", value: "127/134", change: "95%", up: true, icon: Users },
            { label: "Food Waste", value: "3.2%", change: "-1.8%", up: false, icon: Leaf },
            { label: "Hygiene Score", value: "96%", change: "+2%", up: true, icon: Shield },
            { label: "VIP Orders", value: "48", change: "+8", up: true, icon: QrCode },
            { label: "Stock Alerts", value: "3", change: "Low", up: false, icon: Package },
          ].map((stat, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                  <Badge
                    variant="outline"
                    className={stat.up ? "text-green-400 border-green-400/30" : "text-amber-400 border-amber-400/30"}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - AI Agent Feed */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Logistics Agent */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bot className="w-5 h-5 text-[#0ea5e9]" />
                    AI Operations Feed
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Food waste & hygiene compliance monitoring
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-3">
                    {feedItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-lg border ${getTypeStyles(item.type)} animate-fade-in`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{item.agent}</span>
                              <span className="text-xs opacity-60">{item.timestamp}</span>
                            </div>
                            <p className="text-sm opacity-90">{item.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Hygiene Compliance Panel */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-[#22c55e]" />
                  Hygiene Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Handwash Compliance", value: 94, target: 95, icon: HandMetal },
                  { label: "Temperature Checks", value: 100, target: 100, icon: Thermometer },
                  { label: "Surface Sanitisation", value: 98, target: 95, icon: Shield },
                  { label: "PPE Compliance", value: 96, target: 95, icon: Users },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <span>{item.label}</span>
                      </div>
                      <span className={item.value >= item.target ? "text-green-400" : "text-amber-400"}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          item.value >= item.target ? "bg-green-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Map & Charts */}
          <div className="lg:col-span-1 space-y-6">
            {/* Staff Geofencing Map */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-[#a855f7]" />
                  Staff Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">Southampton Docks - Live positions</p>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[300px] bg-[#0a0a12] rounded-lg border border-border overflow-hidden">
                  {/* Map zones */}
                  <div className="absolute top-4 left-4 w-24 h-16 border border-[#c9a962]/30 rounded bg-[#c9a962]/5 flex items-center justify-center">
                    <span className="text-xs text-[#c9a962]">VIP Lounge</span>
                  </div>
                  <div className="absolute top-4 right-4 w-20 h-20 border border-[#0ea5e9]/30 rounded bg-[#0ea5e9]/5 flex items-center justify-center">
                    <span className="text-xs text-[#0ea5e9]">Waterside</span>
                  </div>
                  <div className="absolute bottom-4 left-4 w-28 h-14 border border-[#22c55e]/30 rounded bg-[#22c55e]/5 flex items-center justify-center">
                    <span className="text-xs text-[#22c55e]">Shipyard Deck</span>
                  </div>
                  <div className="absolute top-1/2 left-1/3 w-20 h-16 border border-[#f97316]/30 rounded bg-[#f97316]/5 flex items-center justify-center transform -translate-y-1/2">
                    <span className="text-xs text-[#f97316]">Kitchen</span>
                  </div>

                  {/* Staff markers */}
                  {staffLocations.map((staff) => (
                    <div
                      key={staff.id}
                      className="absolute w-3 h-3 rounded-full bg-[#0ea5e9] animate-pulse cursor-pointer group"
                      style={{ left: `${staff.x}%`, top: `${staff.y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-card border border-border rounded px-2 py-1 whitespace-nowrap">
                          <div className="text-xs font-medium">{staff.name}</div>
                          <div className="text-xs text-muted-foreground">{staff.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                      <span className="text-muted-foreground">Staff ({staffLocations.length})</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Food Waste Monitor */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Leaf className="w-5 h-5 text-[#22c55e]" />
                  Food Waste Monitor
                </CardTitle>
                <p className="text-sm text-muted-foreground">Target: Below 5% per category</p>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wasteData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" domain={[0, 6]} stroke="#666" fontSize={12} />
                      <YAxis dataKey="category" type="category" stroke="#666" fontSize={12} width={70} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#12121a", border: "1px solid #333" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="waste" fill="#22c55e" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="target" fill="#333" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Revenue & QR Orders */}
          <div className="lg:col-span-1 space-y-6">
            {/* Revenue Forecasts */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5 text-[#c9a962]" />
                  Revenue by Zone
                </CardTitle>
                <p className="text-sm text-muted-foreground">Real-time F&B sales</p>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="time" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#12121a", border: "1px solid #333" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="vip" stackId="1" stroke="#c9a962" fill="#c9a962" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="shipyard" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="waterside" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {[
                    { label: "VIP Lounge", colour: "#c9a962" },
                    { label: "Shipyard", colour: "#0ea5e9" },
                    { label: "Waterside", colour: "#22c55e" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.colour }} />
                      <span className="text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VIP QR Ordering */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <QrCode className="w-5 h-5 text-[#ec4899]" />
                  VIP QR Orders
                </CardTitle>
                <p className="text-sm text-muted-foreground">Table-side digital ordering</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {qrOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-lg border border-border bg-secondary/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {order.table}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{order.id}</span>
                      </div>
                      <Badge
                        className={
                          order.status === "ready"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : order.status === "preparing"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                        }
                      >
                        {order.time}
                      </Badge>
                    </div>
                    <div className="text-sm">{order.items.join(", ")}</div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2" size="sm">
                  <Smartphone className="w-4 h-4 mr-2" />
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Sales by Category */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="w-5 h-5 text-[#f97316]" />
                  Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        label={({ name, value }) => `${value}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.colour} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#12121a", border: "1px solid #333" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categoryData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded" style={{ backgroundColor: item.colour }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Catering Complexity Tool */}
        <div className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#c9a962]" />
                Menu & Supply Orchestration
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-powered menu adjustments based on weather, demand, and waste predictions
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weather" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="weather">Weather Intelligence</TabsTrigger>
                  <TabsTrigger value="demand">Demand Forecast</TabsTrigger>
                  <TabsTrigger value="waste">Waste Prevention</TabsTrigger>
                </TabsList>

                <TabsContent value="weather" className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="p-4 text-center">
                        <Thermometer className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                        <div className="text-2xl font-bold">24°C</div>
                        <div className="text-xs text-muted-foreground">Current Temp</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="p-4 text-center">
                        <Wind className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <div className="text-2xl font-bold">12 mph</div>
                        <div className="text-xs text-muted-foreground">Wind Speed</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="p-4 text-center">
                        <Droplets className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                        <div className="text-2xl font-bold">15%</div>
                        <div className="text-xs text-muted-foreground">Rain Chance</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <div className="text-2xl font-bold">High</div>
                        <div className="text-xs text-muted-foreground">Footfall Forecast</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-amber-500/10 border-amber-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-amber-400 mb-1">Weather Advisory</div>
                          <p className="text-sm text-muted-foreground mb-3">
                            High temperatures predicted for tomorrow (28°C). AI recommends the following adjustments:
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Increase soft drink inventory by 30%
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Add gazpacho and chilled seafood to specials
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Reduce hot soup preparation by 50%
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Pre-order additional ice (200kg)
                            </li>
                          </ul>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
                              Apply All Changes
                            </Button>
                            <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-400">
                              Review Individually
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="demand" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          Predicted High Demand
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {[
                            { item: "Fish & Chips", increase: "+45%" },
                            { item: "Pimm's Pitcher", increase: "+60%" },
                            { item: "Ice Cream", increase: "+80%" },
                            { item: "Seafood Platter", increase: "+35%" },
                          ].map((item, i) => (
                            <li key={i} className="flex items-center justify-between">
                              <span className="text-muted-foreground">{item.item}</span>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                {item.increase}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/30 border-border">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-red-400" />
                          Predicted Low Demand
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {[
                            { item: "Hot Soup", decrease: "-50%" },
                            { item: "Hot Chocolate", decrease: "-70%" },
                            { item: "Beef Stew", decrease: "-40%" },
                            { item: "Mulled Wine", decrease: "-90%" },
                          ].map((item, i) => (
                            <li key={i} className="flex items-center justify-between">
                              <span className="text-muted-foreground">{item.item}</span>
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                {item.decrease}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="waste" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <Leaf className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <div className="text-2xl font-bold text-green-400">£2,340</div>
                        <div className="text-xs text-muted-foreground">Saved This Week</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-500/10 border-blue-500/30">
                      <CardContent className="p-4 text-center">
                        <Package className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <div className="text-2xl font-bold text-blue-400">127kg</div>
                        <div className="text-xs text-muted-foreground">Waste Prevented</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-500/10 border-purple-500/30">
                      <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                        <div className="text-2xl font-bold text-purple-400">340</div>
                        <div className="text-xs text-muted-foreground">Staff Meals from Surplus</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-secondary/30 border-border">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">AI Waste Prevention Actions</h4>
                      <ul className="space-y-3 text-sm">
                        {[
                          { action: "Redirected 15kg bread surplus to staff canteen", time: "2 hours ago", saved: "£45" },
                          { action: "Adjusted salad prep quantities for evening service", time: "4 hours ago", saved: "£120" },
                          { action: "Donated excess pastries to local shelter", time: "Yesterday", saved: "£85" },
                          { action: "Converted overripe fruit to smoothie special", time: "Yesterday", saved: "£60" },
                        ].map((item, i) => (
                          <li key={i} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                            <div>
                              <div className="text-foreground">{item.action}</div>
                              <div className="text-xs text-muted-foreground">{item.time}</div>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {item.saved}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* SHEQ Safety & Compliance Module */}
        <div className="mt-6">
          <Card className="bg-card border-border border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    Safety & Compliance Module
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 ml-2">
                      SHEQ Manager View
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Real-time hazard reporting, incident tracking, and compliance monitoring
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <Siren className="w-4 h-4 mr-2" />
                    Emergency Protocol
                  </Button>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <MessageSquareWarning className="w-4 h-4 mr-2" />
                    Report Hazard
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hazards" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="hazards" className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4" />
                    Live Hazards
                  </TabsTrigger>
                  <TabsTrigger value="compliance" className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4" />
                    Compliance Checks
                  </TabsTrigger>
                  <TabsTrigger value="incidents" className="flex items-center gap-2">
                    <FileWarning className="w-4 h-4" />
                    Incident Tracker
                  </TabsTrigger>
                  <TabsTrigger value="risk" className="flex items-center gap-2">
                    <HardHat className="w-4 h-4" />
                    Risk Assessments
                  </TabsTrigger>
                </TabsList>

                {/* Live Hazards Tab */}
                <TabsContent value="hazards" className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-red-500/10 border-red-500/30">
                      <CardContent className="p-4 text-center">
                        <AlertOctagon className="w-8 h-8 mx-auto mb-2 text-red-400" />
                        <div className="text-2xl font-bold text-red-400">1</div>
                        <div className="text-xs text-muted-foreground">Critical Hazards</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-500/10 border-amber-500/30">
                      <CardContent className="p-4 text-center">
                        <CircleAlert className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                        <div className="text-2xl font-bold text-amber-400">2</div>
                        <div className="text-xs text-muted-foreground">Active Warnings</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <div className="text-2xl font-bold text-green-400">12</div>
                        <div className="text-xs text-muted-foreground">Resolved Today</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-500/10 border-blue-500/30">
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <div className="text-2xl font-bold text-blue-400">8 min</div>
                        <div className="text-xs text-muted-foreground">Avg Response Time</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    {hazardReports.map((hazard) => (
                      <Card
                        key={hazard.id}
                        className={`border-l-4 ${
                          hazard.type === "critical"
                            ? "border-l-red-500 bg-red-500/5"
                            : hazard.type === "warning"
                            ? "border-l-amber-500 bg-amber-500/5"
                            : hazard.type === "resolved"
                            ? "border-l-green-500 bg-green-500/5"
                            : "border-l-blue-500 bg-blue-500/5"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  hazard.type === "critical"
                                    ? "bg-red-500/20"
                                    : hazard.type === "warning"
                                    ? "bg-amber-500/20"
                                    : hazard.type === "resolved"
                                    ? "bg-green-500/20"
                                    : "bg-blue-500/20"
                                }`}
                              >
                                <hazard.icon
                                  className={`w-5 h-5 ${
                                    hazard.type === "critical"
                                      ? "text-red-400"
                                      : hazard.type === "warning"
                                      ? "text-amber-400"
                                      : hazard.type === "resolved"
                                      ? "text-green-400"
                                      : "text-blue-400"
                                  }`}
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{hazard.category}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {hazard.id}
                                  </Badge>
                                  <Badge
                                    className={
                                      hazard.status === "responding"
                                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                                        : hazard.status === "investigating"
                                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                        : hazard.status === "resolved"
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    }
                                  >
                                    {hazard.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{hazard.description}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {hazard.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <UserCheck className="w-3 h-3" />
                                    {hazard.reporter}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {hazard.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Camera className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Compliance Checks Tab */}
                <TabsContent value="compliance" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <BadgeCheck className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <div className="text-2xl font-bold text-green-400">94%</div>
                        <div className="text-xs text-muted-foreground">Overall Compliance</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-500/10 border-blue-500/30">
                      <CardContent className="p-4 text-center">
                        <ClipboardCheck className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <div className="text-2xl font-bold text-blue-400">47</div>
                        <div className="text-xs text-muted-foreground">Checks Completed Today</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-500/10 border-amber-500/30">
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                        <div className="text-2xl font-bold text-amber-400">3</div>
                        <div className="text-xs text-muted-foreground">Checks Due Soon</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-secondary/30 border-border">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check Area</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Check</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Next Due</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Checker</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {complianceChecks.map((check, i) => (
                              <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                                <td className="p-4 font-medium">{check.area}</td>
                                <td className="p-4">
                                  <Badge
                                    className={
                                      check.status === "passed"
                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                    }
                                  >
                                    {check.status === "passed" ? "Passed" : "Attention"}
                                  </Badge>
                                </td>
                                <td className="p-4 text-muted-foreground">{check.lastCheck}</td>
                                <td className="p-4 text-muted-foreground">{check.nextDue}</td>
                                <td className="p-4 text-muted-foreground">{check.checker}</td>
                                <td className="p-4">
                                  <Button variant="ghost" size="sm">
                                    Run Check
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Incident Tracker Tab */}
                <TabsContent value="incidents" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-secondary/30 border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Weekly Incident Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={incidentStats}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                              <XAxis dataKey="period" stroke="#666" fontSize={12} />
                              <YAxis stroke="#666" fontSize={12} />
                              <Tooltip
                                contentStyle={{ backgroundColor: "#12121a", border: "1px solid #333" }}
                                labelStyle={{ color: "#fff" }}
                              />
                              <Bar dataKey="hazards" fill="#f59e0b" name="Hazards Reported" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="nearMisses" fill="#3b82f6" name="Near Misses" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="incidents" fill="#ef4444" name="Incidents" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                          {[
                            { label: "Hazards", colour: "#f59e0b" },
                            { label: "Near Misses", colour: "#3b82f6" },
                            { label: "Incidents", colour: "#ef4444" },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.colour }} />
                              <span className="text-muted-foreground">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-secondary/30 border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Safety Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                          <div className="text-4xl font-bold text-green-400">47</div>
                          <div className="text-sm text-muted-foreground">Days Without Lost Time Incident</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-secondary/50 rounded-lg text-center">
                            <div className="text-2xl font-bold">32</div>
                            <div className="text-xs text-muted-foreground">Hazards Reported This Week</div>
                          </div>
                          <div className="p-3 bg-secondary/50 rounded-lg text-center">
                            <div className="text-2xl font-bold">97%</div>
                            <div className="text-xs text-muted-foreground">Resolved Within SLA</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Hazard Reporting Rate</span>
                            <span className="text-green-400">Excellent</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }} />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Staff are actively reporting hazards - 23% above industry average
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Risk Assessments Tab */}
                <TabsContent value="risk" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-4 text-center">
                        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
                        <div className="text-2xl font-bold text-green-400">18</div>
                        <div className="text-xs text-muted-foreground">Current Assessments</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-500/10 border-amber-500/30">
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                        <div className="text-2xl font-bold text-amber-400">2</div>
                        <div className="text-xs text-muted-foreground">Reviews Due</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-500/10 border-red-500/30">
                      <CardContent className="p-4 text-center">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                        <div className="text-2xl font-bold text-red-400">5</div>
                        <div className="text-xs text-muted-foreground">High Risk Activities</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-secondary/30 border-border">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Task/Activity</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Risk Level</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Review</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {riskAssessments.map((ra, i) => (
                              <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                                <td className="p-4 font-medium">{ra.task}</td>
                                <td className="p-4">
                                  <Badge
                                    className={
                                      ra.riskLevel === "high"
                                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                                        : ra.riskLevel === "medium"
                                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                        : "bg-green-500/20 text-green-400 border-green-500/30"
                                    }
                                  >
                                    {ra.riskLevel.charAt(0).toUpperCase() + ra.riskLevel.slice(1)}
                                  </Badge>
                                </td>
                                <td className="p-4 text-muted-foreground">{ra.lastReview}</td>
                                <td className="p-4">
                                  <Badge
                                    variant="outline"
                                    className={
                                      ra.status === "current"
                                        ? "text-green-400 border-green-400/30"
                                        : "text-amber-400 border-amber-400/30"
                                    }
                                  >
                                    {ra.status === "current" ? "Current" : "Review Due"}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <Button variant="ghost" size="sm">
                                    View RA
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <HardHat className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <div className="font-semibold text-blue-400 mb-1">AI Safety Recommendation</div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Based on today&apos;s weather conditions and footfall predictions, the following additional controls are recommended:
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Deploy additional wet floor signage near outdoor service areas
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Increase glass collection frequency in high-traffic zones
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              Brief staff on sun exposure protocols for outdoor assignments
                            </li>
                          </ul>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                              Implement All
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">
                              Customise
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
