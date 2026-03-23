"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  BarChart3,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#001351] relative overflow-hidden px-4 py-12">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-white/5 blur-[100px] rounded-full" />
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 pt-24 md:pt-8">
        {/* Left Side: Finance Context */}
        <div className="hidden lg:flex flex-col space-y-8 text-white pr-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
              <TrendingUp className="text-[#001351] w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Finblage</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Unlock Smarter Financial Insights.
          </h1>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-md">
            The world's most trusted source for market insights, news, and in-depth financial analysis.
          </p>

          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/5 p-2 rounded-lg border border-white/10">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Bank-Grade Security</h3>
                <p className="text-white/60">Your data is always encrypted and your privacy is our top priority.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/5 p-2 rounded-lg border border-white/10">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">Real-Time Analytics</h3>
                <p className="text-white/60">Stay ahead of the market with precision insights and live updates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <Card className="w-full bg-white/5 backdrop-blur-2xl border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6 pt-8 text-center sm:text-left border-b border-white/5 px-8">
            <CardTitle className="text-3xl font-bold text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              Welcome back! Provide your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8 px-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 ml-1">Work Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 transition-all rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Link href="#" className="text-xs text-accent hover:text-accent-foreground font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Min. 8 characters" 
                    required 
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 transition-all rounded-xl"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
                <Button 
                  type="submit" 
                  className="w-full h-12 mt-4 bg-accent hover:bg-[#ffb326] text-[#001351] font-bold rounded-xl text-lg shadow-lg shadow-accent/20 transition-all active:scale-[0.98] border-none"
                  disabled={loading}
                >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full">
                    <span>Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-6 items-center border-t border-white/5 pt-6 pb-8 px-8">
            <div className="flex items-center gap-3 w-full opacity-50">
              <div className="h-px bg-white/20 grow" />
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Or continue with</span>
              <div className="h-px bg-white/20 grow" />
            </div>

            <div className="w-full">
              <Button variant="outline" className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white rounded-xl transition-all font-medium">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-accent hover:text-accent-foreground font-semibold transition-colors">
                Create Account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Trust Badges Footer */}
      <div className="mt-12 opacity-40 hover:opacity-100 transition-opacity z-10 hidden md:flex items-center gap-12 text-white">
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
          <div className="w-6 h-6 bg-white/20 rounded-full" />
          <span className="text-xs font-bold tracking-widest uppercase">Verified System</span>
        </div>
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
          <div className="w-6 h-6 bg-white/20 rounded-full" />
          <span className="text-xs font-bold tracking-widest uppercase">SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
          <div className="w-6 h-6 bg-white/20 rounded-full" />
          <span className="text-xs font-bold tracking-widest uppercase">SEC Compliant</span>
        </div>
      </div>
    </div>
  );
}
