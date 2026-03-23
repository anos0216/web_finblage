"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { 
  Building2, 
  Lock, 
  Mail, 
  User,
  ArrowRight, 
  Eye, 
  EyeOff, 
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Globe
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic for signup goes here (e.g., calling your API)
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#001351] relative overflow-hidden px-4 py-12">
      {/* Ornaments - Slightly different for signup */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-accent/10 blur-[130px] rounded-full" />
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-white/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Side: Value Proposition */}
        <div className="hidden lg:flex flex-col space-y-10 text-white pr-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
              <TrendingUp className="text-[#001351] w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Finblage</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Start Your <span className="text-accent">Financial</span> Journey Today.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-md">
              Join thousands of professionals gaining a competitive edge with our premium intelligence platform.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Globe, title: "Global Market Access", desc: "Monitor major indices and assets from primary markets worldwide." },
              { icon: Briefcase, title: "Portfolio Intelligence", desc: "Advanced tools to track, analyze and optimize your asset allocation." },
              { icon: CheckCircle2, title: "Curated Content", desc: "Expert-only news and insights delivered to your inbox every morning." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="bg-accent/20 p-2 rounded-lg">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <Card className="w-full bg-white/5 backdrop-blur-2xl border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 pb-6 pt-8 border-b border-white/5 px-8">
            <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your details to join the Finblage network.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8 px-8 space-y-5">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300 ml-1">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      value={formData.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-300 ml-1">Company <span className="text-gray-600 text-[10px] uppercase ml-1">(Optional)</span></Label>
                  <div className="relative group">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                    <Input 
                      id="company" 
                      placeholder="FinCorp Inc." 
                      value={formData.company}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, company: e.target.value})}
                      className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-accent/50 focus:ring-accent/20 transition-all rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 ml-1">Secure Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a strong password" 
                    required 
                    value={formData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
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

              <div className="flex items-center space-x-2 pt-2 ml-1">
                <Checkbox 
                  id="terms" 
                  className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:border-none" 
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked: boolean) => setFormData({...formData, acceptTerms: checked})}
                />
                <Label htmlFor="terms" className="text-sm text-gray-400 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <Link href="#" className="text-accent underline decoration-accent/30 underline-offset-4">Terms of Service</Link> and <Link href="#" className="text-accent underline decoration-accent/30 underline-offset-4">Privacy Policy</Link>
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-accent hover:bg-[#ffb326] text-[#001351] font-bold rounded-xl text-lg shadow-lg shadow-accent/20 transition-all active:scale-[0.98] mt-6 border-none"
                disabled={loading || !formData.acceptTerms}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full">
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-6 items-center border-t border-white/5 pt-6 pb-8 px-8">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:text-accent-foreground font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
