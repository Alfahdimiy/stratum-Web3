import { Navbar } from "@/components/Navbar";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-1000">
            <Zap className="w-4 h-4 fill-current" />
            V2.0 Protocol Mainnet is Live
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            The Next Generation of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Web3 Capital Deployment
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure, audited, and AI-powered launchpad ecosystem for high-conviction staking and seed participation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/crowdsale">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary h-12 px-8">
                Explore Crowdsales
              </Button>
            </Link>
            <Link href="/staking">
              <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5 h-12 px-8">
                Staking Hub
              </Button>
            </Link>
          </div>
        </section>

        {/* Global Stats Overview */}
        <AnalyticsDashboard />

        {/* Featured Modules */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-panel group hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Token Crowdsale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Participate in verified private and public sales with built-in hard/soft cap protection and automated vesting.
              </p>
              <Link href="/crowdsale" className="inline-flex items-center text-primary text-sm font-medium hover:underline">
                View Active Sales →
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-panel group hover:border-accent/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="font-headline">Staking Hub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Commit assets to fixed-term lock periods. Leverage our AI Forecaster to predict your future yields with precision.
              </p>
              <Link href="/staking" className="inline-flex items-center text-accent text-sm font-medium hover:underline">
                Start Staking →
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-panel group hover:border-chart-3/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-chart-3" />
              </div>
              <CardTitle className="font-headline">Governance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Forge the future of the protocol. Vote on whitelisting new projects and adjusting emission reward tiers.
              </p>
              <span className="text-muted-foreground text-sm">Coming Soon</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}