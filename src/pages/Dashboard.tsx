
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PremiumHeader } from "@/components/PremiumHeader";
import { KanbanBoard } from "@/components/KanbanBoard";
import { DailyActions } from "@/components/DailyActions";
import { MetricsCards } from "@/components/MetricsCards";
import { AIRecommendations } from "@/components/AIRecommendations";
import { Analytics } from "@/components/Analytics";
import { NotificationSystem } from "@/components/NotificationToast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background effects with neural network patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-drift"></div>
        <div className="absolute top-20 -right-4 w-96 h-96 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-drift-delayed"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl animate-drift-slow"></div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 flex flex-col transition-all duration-700 ease-out ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <PremiumHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section with enhanced animation */}
              <div className="animate-slide-in-down">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-100 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-slate-300 text-xl">Your AI-powered sales command center awaits.</p>
              </div>

              {/* Metrics Cards with enhanced stagger animation */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <MetricsCards />
              </div>

              {/* Enhanced Tabbed Interface */}
              <Tabs defaultValue="pipeline" className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-600">
                  <TabsTrigger 
                    value="pipeline" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
                  >
                    Sales Pipeline
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
                  >
                    AI Intelligence
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pipeline" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Kanban Board */}
                    <div className="xl:col-span-3">
                      <KanbanBoard />
                    </div>

                    {/* Daily Actions Sidebar */}
                    <div className="xl:col-span-1">
                      <DailyActions />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="space-y-6 mt-6">
                  <AIRecommendations />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-6">
                  <Analytics />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>

      {/* Global Notification System */}
      <NotificationSystem />
    </div>
  );
};

export default Dashboard;
