
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin ? "Successfully logged in." : "Your account has been created successfully.",
    });
    
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-animated animate-gradient"></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="glass w-full max-w-md p-8 animate-scale-in hover-lift">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              CRM Pro
            </h1>
            <p className="text-white/80">
              {isLogin ? "Welcome back to your dashboard" : "Create your account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/50 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold py-3"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/80 hover:text-white transition-colors duration-300 underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
