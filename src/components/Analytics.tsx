
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 45000, deals: 12, conversion: 68 },
  { name: 'Feb', revenue: 52000, deals: 18, conversion: 72 },
  { name: 'Mar', revenue: 48000, deals: 15, conversion: 65 },
  { name: 'Apr', revenue: 61000, deals: 22, conversion: 75 },
  { name: 'May', revenue: 55000, deals: 19, conversion: 70 },
  { name: 'Jun', revenue: 67000, deals: 25, conversion: 78 },
];

export const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$328,000", change: "+12.5%", color: "from-emerald-500 to-emerald-600" },
          { title: "Deals Closed", value: "111", change: "+8.2%", color: "from-blue-500 to-cyan-600" },
          { title: "Conversion Rate", value: "71.3%", change: "+2.1%", color: "from-violet-500 to-purple-600" },
          { title: "Avg Deal Size", value: "$2,955", change: "-1.2%", color: "from-amber-500 to-orange-600" }
        ].map((metric, index) => (
          <Card key={metric.title} className="glass border-slate-700 hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-400">{metric.title}</h3>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${metric.color} animate-pulse`}></div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-slate-100">{metric.value}</p>
                <p className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metric.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="glass border-slate-700 hover-lift">
          <CardHeader>
            <CardTitle className="text-slate-100">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deals Pipeline */}
        <Card className="glass border-slate-700 hover-lift">
          <CardHeader>
            <CardTitle className="text-slate-100">Deals by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }} 
                />
                <Bar 
                  dataKey="deals" 
                  fill="url(#barGradient)"
                  animationDuration={2000}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Rate Chart */}
      <Card className="glass border-slate-700 hover-lift">
        <CardHeader>
          <CardTitle className="text-slate-100">Conversion Rate Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#F1F5F9'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="conversion" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
