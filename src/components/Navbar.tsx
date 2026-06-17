"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Wallet, LayoutDashboard, Rocket, Coins, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV_LINKS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Crowdsale", href: "/crowdsale", icon: Rocket },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Admin", href: "/admin", icon: ShieldCheck },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
];

export function Navbar() {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = () => {
    setIsConnected(true);
    setAddress("0x71C7...f6D2");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-headline text-xl font-bold tracking-tighter">STRATUM</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5",
                    isActive ? "text-primary bg-white/5" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-white/5">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono">{address}</span>
            </div>
          ) : (
            <Button 
              onClick={connectWallet}
              variant="default" 
              className="bg-primary hover:bg-primary/90 glow-primary h-9 gap-2"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
