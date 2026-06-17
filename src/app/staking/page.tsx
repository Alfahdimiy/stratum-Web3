"use client"

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ForecasterTool } from "@/components/ForecasterTool";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, Timer, CheckCircle2, ChevronRight, Coins, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  { days: 30, apy: 8.5, multiplier: "1.0x", popular: false },
  { days: 90, apy: 14.2, multiplier: "1.5x", popular: true },
  { days: 180, apy: 22.8, multiplier: "2.5x", popular: false },
];

export default function StakingPage() {
  const [selectedTier, setSelectedTier] = useState(90);
  const [step, setStep] = useState<'idle' | 'approve' | 'stake' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const startWorkflow = async () => {
    setStep('approve');
    setProgress(30);
    // Simulate transaction delay
    await new Promise(r => setTimeout(r, 2000));
    setProgress(60);
    setStep('stake');
    await new Promise(r => setTimeout(r, 2500));
    setProgress(100);
    setStep('complete');
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Staking Interface */}
          <div className="lg:col-span-2 space-y-8">
            <header>
              <h1 className="text-4xl font-bold font-headline mb-2">Multi-Tier Staking Hub</h1>
              <p className="text-muted-foreground">Secure your tokens and earn protocol-wide yield emissions.</p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {TIERS.map((tier) => (
                <Card 
                  key={tier.days}
                  onClick={() => setSelectedTier(tier.days)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 relative overflow-hidden",
                    selectedTier === tier.days ? "border-primary bg-primary/5 ring-1 ring-primary" : "glass-panel hover:bg-white/5",
                    tier.popular && "border-accent/30"
                  )}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0">
                      <Badge className="bg-accent text-accent-foreground rounded-none rounded-bl-lg text-[10px] uppercase font-bold">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <Timer className={cn("w-8 h-8 mx-auto mb-2", selectedTier === tier.days ? "text-primary" : "text-muted-foreground")} />
                    <CardTitle className="text-xl font-headline">{tier.days} Days</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-1">
                    <div className="text-3xl font-bold">{tier.apy}%</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Fixed APY</div>
                  </CardContent>
                  <CardFooter className="justify-center border-t border-white/5 py-3">
                    <span className="text-xs font-semibold text-accent">{tier.multiplier} Yield Multiplier</span>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                  Transaction Workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      step === 'approve' || step === 'stake' || step === 'complete' ? "bg-primary border-primary text-white" : "border-white/10 text-muted-foreground"
                    )}>
                      {step === 'stake' || step === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                    </div>
                    <div>
                      <h4 className="font-medium">Approve Tokens</h4>
                      <p className="text-xs text-muted-foreground">Grant permission to move FORGE tokens</p>
                    </div>
                  </div>
                  <div className="w-12 h-px bg-white/10 hidden sm:block" />
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      step === 'stake' || step === 'complete' ? "bg-primary border-primary text-white" : "border-white/10 text-muted-foreground"
                    )}>
                      {step === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : "2"}
                    </div>
                    <div>
                      <h4 className="font-medium">Stake Tokens</h4>
                      <p className="text-xs text-muted-foreground">Finalize lock in protocol smart contract</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="uppercase tracking-wider">Workflow Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex flex-col gap-4">
                  {step === 'idle' && (
                    <Button 
                      size="lg" 
                      onClick={startWorkflow}
                      className="w-full bg-primary hover:bg-primary/90 glow-primary font-bold tracking-tight"
                    >
                      Stake 1,000 FORGE for {selectedTier} Days
                    </Button>
                  )}
                  {step !== 'idle' && step !== 'complete' && (
                    <Button disabled size="lg" className="w-full bg-secondary text-muted-foreground cursor-not-allowed">
                      <Lock className="w-4 h-4 mr-2" />
                      Waiting for On-Chain Confirmation...
                    </Button>
                  )}
                  {step === 'complete' && (
                    <div className="text-center p-6 rounded-xl bg-accent/10 border border-accent/20 animate-in zoom-in duration-300">
                      <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
                      <h3 className="text-xl font-headline font-bold mb-1">Staking Successful</h3>
                      <p className="text-sm text-muted-foreground mb-4">Your tokens are now locked and earning rewards.</p>
                      <Button variant="outline" onClick={() => {setStep('idle'); setProgress(0)}}>Stake More Assets</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Sidepanel */}
          <div className="space-y-8">
            <ForecasterTool />
            
            <Card className="glass-panel border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  Current Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">Total Staked</span>
                  <span className="font-bold">12,500 FORGE</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">Pending Rewards</span>
                  <span className="font-bold text-accent">42.8 FORGE</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-sm text-muted-foreground">Next Unlock</span>
                  <span className="font-bold">Mar 12, 2024</span>
                </div>
                <Button className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">Claim Rewards</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}