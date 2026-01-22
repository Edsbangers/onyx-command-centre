"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Anchor,
  Building2,
  Sparkles,
  ArrowRight,
  Ship,
  Users,
  ChefHat,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Award,
  CheckCircle2,
  QrCode,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-onyx">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">Onyx Digital</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#sectors" className="text-muted-foreground hover:text-foreground transition-colors">
                Sectors
              </a>
              <a href="#case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                Case Studies
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </a>
              <Link href="/dashboard">
                <Button className="bg-[#c9a962] hover:bg-[#b8954f] text-black font-semibold">
                  Command Centre
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cinematic Boat Show */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/20 via-transparent to-[#0a0a0f]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c9a962]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Animated water lines */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent animate-pulse" />
          <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30 px-4 py-2">
            <Ship className="w-4 h-4 mr-2" />
            Southampton Boat Show 2025 Partner
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient-gold">Intelligent</span>
            <br />
            <span className="text-foreground">Event Command</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Orchestrating premium experiences across marine, corporate, and activation sectors
            with AI-powered logistics and real-time operational intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#c9a962] hover:bg-[#b8954f] text-black font-semibold px-8 py-6 text-lg">
                Enter Command Centre
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-[#0ea5e9]/30 text-[#0ea5e9] hover:bg-[#0ea5e9]/10 px-8 py-6 text-lg">
              View Live Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { value: "50K+", label: "Guests Served" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "£2.4M", label: "F&B Revenue Managed" },
              { value: "340", label: "Staff Coordinated" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#c9a962]/20 text-[#c9a962] border-[#c9a962]/30">
              Our Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Specialist Sectors</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Delivering exceptional experiences across three core verticals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Marine Sector */}
            <Card className="bg-card border-border hover:border-[#0ea5e9]/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl gradient-marine flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Anchor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Marine</h3>
                <p className="text-muted-foreground mb-6">
                  Yacht shows, regattas, and maritime events. Specialising in waterfront logistics,
                  VIP hospitality, and luxury F&B orchestration.
                </p>
                <ul className="space-y-2 text-sm">
                  {["Southampton Boat Show", "Monaco Yacht Show", "Cowes Week"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-[#0ea5e9]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Corporate Sector */}
            <Card className="bg-card border-border hover:border-[#c9a962]/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Corporate</h3>
                <p className="text-muted-foreground mb-6">
                  Executive conferences, product launches, and stakeholder events.
                  Precision logistics with white-glove service standards.
                </p>
                <ul className="space-y-2 text-sm">
                  {["Global Summit Catering", "Board Away Days", "Client Entertainment"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-[#c9a962]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Activation Sector */}
            <Card className="bg-card border-border hover:border-[#a855f7]/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Activation</h3>
                <p className="text-muted-foreground mb-6">
                  Brand experiences, festival hospitality, and experiential marketing.
                  Dynamic operations for high-footfall environments.
                </p>
                <ul className="space-y-2 text-sm">
                  {["Festival VIP Areas", "Brand Pop-ups", "Experiential Dining"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-[#a855f7]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-24 px-6 bg-[#0a0a0f]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30">
              Proven Results
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Delivering measurable impact for prestigious clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Southampton Boat Show Case Study */}
            <Card className="bg-card border-border overflow-hidden group">
              <div className="h-48 gradient-marine relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Ship className="w-24 h-24 text-white/20" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/20 text-white border-white/30">Marine Sector</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Southampton Boat Show</h3>
                <p className="text-[#0ea5e9] font-semibold mb-4">10-Day Maritime Exhibition</p>
                <p className="text-muted-foreground mb-6">
                  Complete F&B orchestration across 12 hospitality zones, including VIP lounges,
                  exhibitor catering, and public concessions. Our AI-powered logistics reduced
                  food waste by 34% whilst maintaining 99.2% stock availability.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-border pt-6">
                  <div>
                    <div className="text-2xl font-bold text-[#0ea5e9]">34%</div>
                    <div className="text-xs text-muted-foreground">Food Waste Reduced</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0ea5e9]">£1.2M</div>
                    <div className="text-xs text-muted-foreground">Revenue Generated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0ea5e9]">45K</div>
                    <div className="text-xs text-muted-foreground">Guests Served</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thule Case Study */}
            <Card className="bg-card border-border overflow-hidden group">
              <div className="h-48 gradient-gold relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-24 h-24 text-black/20" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/20 text-white border-black/30">Corporate Sector</Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Thule Group</h3>
                <p className="text-[#c9a962] font-semibold mb-4">European Product Launch Series</p>
                <p className="text-muted-foreground mb-6">
                  Premium hospitality for Thule&apos;s multi-city product launch tour. Coordinated
                  catering logistics across 8 European venues with real-time compliance monitoring
                  and staff hygiene tracking achieving 100% audit compliance.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-border pt-6">
                  <div>
                    <div className="text-2xl font-bold text-[#c9a962]">8</div>
                    <div className="text-xs text-muted-foreground">Cities Covered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#c9a962]">100%</div>
                    <div className="text-xs text-muted-foreground">Compliance Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#c9a962]">2.4K</div>
                    <div className="text-xs text-muted-foreground">VIP Attendees</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#c9a962]/20 text-[#c9a962] border-[#c9a962]/30">
              Platform Capabilities
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Agentic Intelligence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Autonomous AI agents working 24/7 to optimise your event operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ChefHat,
                title: "Food Waste Reduction",
                description: "AI monitors stock levels and predicts demand to minimise waste whilst ensuring availability",
                colour: "#22c55e",
              },
              {
                icon: Shield,
                title: "Hygiene Compliance",
                description: "Real-time staff hygiene monitoring with automated alerts and audit trail documentation",
                colour: "#0ea5e9",
              },
              {
                icon: Users,
                title: "Staff Geofencing",
                description: "Live location tracking ensures optimal staff distribution across all zones",
                colour: "#a855f7",
              },
              {
                icon: BarChart3,
                title: "Revenue Analytics",
                description: "Real-time sales dashboards with predictive forecasting by zone and category",
                colour: "#c9a962",
              },
              {
                icon: Zap,
                title: "Autonomous Ordering",
                description: "AI agents trigger supplier orders automatically when thresholds are reached",
                colour: "#f97316",
              },
              {
                icon: QrCode,
                title: "Guest QR Ordering",
                description: "VIP guests order directly from their tables via digital agent interface",
                colour: "#ec4899",
              },
              {
                icon: Globe,
                title: "Weather Intelligence",
                description: "Menu and inventory adjustments based on real-time weather forecasting",
                colour: "#06b6d4",
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Continuous monitoring of service standards with instant escalation protocols",
                colour: "#eab308",
              },
            ].map((feature, i) => (
              <Card key={i} className="bg-card border-border hover:border-border/80 transition-all">
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${feature.colour}20` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.colour }} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#12121a] to-[#1a1a24] border-[#c9a962]/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a962]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0ea5e9]/5 rounded-full blur-3xl" />
            <CardContent className="p-12 text-center relative">
              <Badge className="mb-6 bg-[#c9a962]/20 text-[#c9a962] border-[#c9a962]/30">
                Ready to Transform?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Experience the Command Centre
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                See how Onyx Digital can revolutionise your event operations with
                AI-powered logistics and real-time intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-[#c9a962] hover:bg-[#b8954f] text-black font-semibold px-8">
                    Launch Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-[#c9a962]/30 text-[#c9a962] hover:bg-[#c9a962]/10">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-gradient-gold">Onyx Digital</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Onyx Events Ltd. All rights reserved. Registered in England & Wales.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
