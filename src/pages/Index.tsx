
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-animated animate-gradient flex items-center justify-center relative overflow-hidden">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 z-10 animate-scale-in">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in-up">
            CRM Pro
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Experience the future of customer relationship management with our stunning, 
            AI-powered dashboard that transforms how you manage your sales pipeline.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={() => navigate("/login")}
            className="px-8 py-4 text-lg font-semibold bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Get Started
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
          >
            View Demo
          </Button>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-white/70 text-sm">
            Join thousands of sales teams already using CRM Pro
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
