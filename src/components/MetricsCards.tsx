
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+12.5%",
    trend: "up",
    color: "from-green-500 to-emerald-600",
    icon: "💰"
  },
  {
    title: "Active Deals",
    value: "156",
    change: "+8.2%",
    trend: "up",
    color: "from-blue-500 to-cyan-600",
    icon: "🤝"
  },
  {
    title: "Conversion Rate",
    value: "68.4%",
    change: "+2.1%",
    trend: "up",
    color: "from-purple-500 to-pink-600",
    icon: "📈"
  },
  {
    title: "Avg. Deal Size",
    value: "$18,250",
    change: "-3.2%",
    trend: "down",
    color: "from-orange-500 to-red-600",
    icon: "💎"
  }
];

export const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card 
          key={metric.title} 
          className="p-6 hover-lift hover-glow transition-all duration-300 border-0 glass animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center text-white text-xl animate-float`}>
              {metric.icon}
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend === 'up' ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-1000 ease-out animate-shimmer`}
                style={{ width: `${Math.random() * 60 + 40}%` }}
              ></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
