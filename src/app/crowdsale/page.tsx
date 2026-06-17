"use client"

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Rocket, Info, CheckCircle, ShieldAlert, Timer, Users, TrendingUp } from "lucide-react";

export default function CrowdsalePage() {
  const [ethAmount, setEthAmount] = useState("0.5");
  const hardCap = 1000;
  const currentRaised = 742;
  const progressPercent = (currentRaised / hardCap) * 100;

  return (
    <main className="min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-2 px-3">Active Now</Badge>
            <h1 className="text-5xl font-bold font-headline">Forge Finance Seed Round</h1>
            <p className="text-muted-foreground text-lg">Decentralized liquidity provisioning for the VaultForge ecosystem.</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-4 rounded-xl border border-white/5">
            <Timer className="w-5 h-5 text-accent" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Time Remaining</p>
              <p className="font-mono text-lg font-bold">04d : 12h : 45m</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-panel overflow-hidden border-primary/20">
              <div className="h-2 bg-primary w-full" />
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Total Raised</p>
                    <p className="text-3xl font-bold">{currentRaised} ETH</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Participants</p>
                    <p className="text-3xl font-bold">1,482</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Price</p>
                    <p className="text-3xl font-bold">1 ETH = 50k FGE</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span>Sale Progress (Hard Cap: {hardCap} ETH)</span>
                    </div>
                    <span className="text-accent">{progressPercent.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-4 bg-white/5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Soft Cap: 250 ETH</span>
                    <span>Remaining: {hardCap - currentRaised} ETH</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-panel border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">Tokenomics Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span className="font-mono">100,000,000 FGE</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Vesting Schedule</span>
                    <span>10% TGE, 6mo cliff, 12mo linear</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Min. Allocation</span>
                    <span>0.1 ETH</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Max. Allocation</span>
                    <span>10 ETH</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/5">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">Audit & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Fully Audited by QuantForge</p>
                      <p className="text-xs text-muted-foreground">Report released on Feb 12, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Liquidity Locked</p>
                      <p className="text-xs text-muted-foreground">Unicrypt V2 Locker: 365 Days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="glass-panel border-primary/30 glow-primary sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Participate</CardTitle>
                <CardDescription>Enter ETH amount to contribute</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <label>Amount (ETH)</label>
                    <span className="text-muted-foreground">Bal: 12.45 ETH</span>
                  </div>
                  <div className="relative">
                    <Input 
                      type="number" 
                      value={ethAmount} 
                      onChange={(e) => setEthAmount(e.target.value)}
                      className="h-14 bg-background/50 border-white/10 text-xl font-bold pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">MAX</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/50 border border-white/5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You will receive</span>
                    <span className="font-bold text-accent">{(parseFloat(ethAmount || "0") * 50000).toLocaleString()} FGE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gas Estimate</span>
                    <span className="font-mono">~0.0052 ETH</span>
                  </div>
                </div>

                <Button className="w-full h-14 bg-primary hover:bg-primary/90 glow-primary font-bold text-lg">
                  Confirm Contribution
                </Button>
                
                <p className="text-[10px] text-muted-foreground text-center px-4 leading-relaxed uppercase tracking-tighter">
                  By participating, you agree to our terms of service and acknowledge the vesting terms of this token sale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}