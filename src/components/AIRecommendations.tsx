
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const AIRecommendations = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [confidence, setConfidence] = useState(0);
  
  const recommendations = [
    {
      id: 1,
      title: "High-Value Lead Identified",
      text: "John Smith from TechCorp shows 87% likelihood of conversion based on engagement patterns.",
      confidence: 87,
      priority: "high",
      action: "Schedule Call"
    },
    {
      id: 2,
      title: "Deal Risk Alert",
      text: "MegaCorp deal may need attention - similar deals historically close 23% faster with follow-up.",
      confidence: 73,
      priority: "medium",
      action: "Send Follow-up"
    },
    {
      id: 3,
      title: "Upsell Opportunity",
      text: "Existing client DataFlow Inc. has usage patterns suggesting readiness for premium features.",
      confidence: 92,
      priority: "high",
      action: "Propose Upgrade"
    }
  ];

  const typeText = (text: string, callback?: () => void) => {
    setIsTyping(true);
    setDisplayedText("");
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
        setIsTyping(false);
        callback?.();
      }
    }, 30);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfidence(85);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Thinking Indicator */}
      <Card className="glass border-violet-500/20 animate-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-violet-400">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-ping opacity-30"></div>
              </div>
            </div>
            AI Intelligence Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-slate-400">Analyzing your pipeline...</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">AI Confidence</span>
                <span className="text-violet-400">{confidence}%</span>
              </div>
              <Progress 
                value={confidence} 
                className="h-2 bg-slate-700"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div className="grid gap-4">
        {recommendations.map((rec, index) => (
          <Card 
            key={rec.id}
            className="glass border-slate-700 hover-lift animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge 
                    className={`${
                      rec.priority === 'high' 
                        ? 'bg-gradient-to-r from-red-500 to-red-400 animate-pulse-glow' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-400'
                    }`}
                  >
                    {rec.priority.toUpperCase()}
                  </Badge>
                  <h3 className="font-semibold text-slate-100">{rec.title}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-400">Confidence</div>
                  <div className={`text-sm font-bold ${
                    rec.confidence > 80 ? 'text-emerald-400' :
                    rec.confidence > 60 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {rec.confidence}%
                  </div>
                </div>
              </div>
              
              <p className="text-slate-300 mb-4 leading-relaxed">{rec.text}</p>
              
              <div className="flex justify-between items-center">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 transition-all duration-300"
                >
                  {rec.action}
                </Button>
                
                <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      rec.confidence > 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                      rec.confidence > 60 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 
                      'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{ width: `${rec.confidence}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
