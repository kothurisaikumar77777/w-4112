
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { ArrowUp, ArrowDown, DollarSign, Calendar, User, TrendingUp, Filter, MoreHorizontal } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  stage: string;
  closeDate: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  lastActivity: string;
  nextAction: string;
}

const stages = [
  { name: 'Qualified', color: 'from-blue-500 to-cyan-500', deals: 8 },
  { name: 'Discovery', color: 'from-purple-500 to-pink-500', deals: 5 },
  { name: 'Proposal', color: 'from-orange-500 to-red-500', deals: 3 },
  { name: 'Negotiation', color: 'from-green-500 to-teal-500', deals: 2 },
  { name: 'Closed Won', color: 'from-emerald-500 to-green-600', deals: 4 }
];

const sampleDeals: Deal[] = [
  {
    id: '1',
    title: 'Enterprise CRM Implementation',
    company: 'TechCorp Inc.',
    value: 250000,
    probability: 85,
    stage: 'Negotiation',
    closeDate: '2024-02-15',
    owner: 'Sarah Johnson',
    priority: 'high',
    lastActivity: '2 hours ago',
    nextAction: 'Send final proposal'
  },
  {
    id: '2',
    title: 'Marketing Automation Setup',
    company: 'StartupXYZ',
    value: 75000,
    probability: 60,
    stage: 'Discovery',
    closeDate: '2024-03-01',
    owner: 'Michael Chen',
    priority: 'medium',
    lastActivity: '1 day ago',
    nextAction: 'Schedule demo'
  },
  {
    id: '3',
    title: 'Sales Training Program',
    company: 'Enterprise Solutions',
    value: 45000,
    probability: 40,
    stage: 'Qualified',
    closeDate: '2024-03-15',
    owner: 'Emily Rodriguez',
    priority: 'low',
    lastActivity: '3 days ago',
    nextAction: 'Follow up call'
  }
];

const Deals = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [sortBy, setSortBy] = useState<'value' | 'probability' | 'closeDate'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50/50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50/50';
      case 'low': return 'border-l-green-500 bg-green-50/50';
      default: return 'border-l-gray-500 bg-gray-50/50';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'from-green-500 to-emerald-500';
    if (probability >= 60) return 'from-yellow-500 to-orange-500';
    if (probability >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const sortDeals = (deals: Deal[]) => {
    return [...deals].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'value':
          comparison = a.value - b.value;
          break;
        case 'probability':
          comparison = a.probability - b.probability;
          break;
        case 'closeDate':
          comparison = new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-in-down">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Deals Pipeline
            </h1>
            <p className="text-slate-600 mt-2">Track and manage your sales opportunities</p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="hover:bg-slate-100 transition-colors duration-200">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl transition-all duration-300">
              <DollarSign className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {stages.map((stage, index) => (
            <Card key={stage.name} className="p-6 hover-lift hover-glow transition-all duration-300 border-0 glass animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="space-y-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stage.color} rounded-xl flex items-center justify-center text-white font-bold text-lg animate-float`}>
                  {stage.deals}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{stage.name}</h3>
                  <p className="text-sm text-slate-600">{stage.deals} deals</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${stage.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${(stage.deals / 8) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sorting Controls */}
        <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Sort by:</Label>
            <Button
              variant={sortBy === 'value' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('value')}
              className="hover:scale-105 transition-transform duration-200"
            >
              Value
              {sortBy === 'value' && (
                sortOrder === 'desc' ? <ArrowDown className="w-3 h-3 ml-1" /> : <ArrowUp className="w-3 h-3 ml-1" />
              )}
            </Button>
            <Button
              variant={sortBy === 'probability' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('probability')}
              className="hover:scale-105 transition-transform duration-200"
            >
              Probability
              {sortBy === 'probability' && (
                sortOrder === 'desc' ? <ArrowDown className="w-3 h-3 ml-1" /> : <ArrowUp className="w-3 h-3 ml-1" />
              )}
            </Button>
            <Button
              variant={sortBy === 'closeDate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('closeDate')}
              className="hover:scale-105 transition-transform duration-200"
            >
              Close Date
              {sortBy === 'closeDate' && (
                sortOrder === 'desc' ? <ArrowDown className="w-3 h-3 ml-1" /> : <ArrowUp className="w-3 h-3 ml-1" />
              )}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="hover:scale-105 transition-transform duration-200"
          >
            {sortOrder === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
          </Button>
        </div>

        {/* Deals List */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {sortDeals(sampleDeals).map((deal, index) => (
            <Card
              key={deal.id}
              className={`p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-l-4 ${getPriorityColor(deal.priority)} glass group ${
                draggedDeal === deal.id ? 'opacity-50 scale-95' : ''
              }`}
              onClick={() => setSelectedDeal(deal)}
              onDragStart={() => setDraggedDeal(deal.id)}
              onDragEnd={() => setDraggedDeal(null)}
              draggable
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Deal Info */}
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                    {deal.title}
                  </h3>
                  <p className="text-slate-600">{deal.company}</p>
                  <Badge className={`${deal.priority === 'high' ? 'bg-red-100 text-red-800' : deal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} border-0`}>
                    {deal.priority} priority
                  </Badge>
                </div>

                {/* Value */}
                <div className="md:col-span-2 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    ${(deal.value / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-slate-500">Deal Value</p>
                </div>

                {/* Probability */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{deal.probability}%</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <Progress 
                    value={deal.probability} 
                    className="h-2"
                  />
                  <div className={`h-2 rounded-full bg-gradient-to-r ${getProbabilityColor(deal.probability)} opacity-80 animate-shimmer`}
                    style={{ width: `${deal.probability}%` }}
                  ></div>
                </div>

                {/* Stage */}
                <div className="md:col-span-2 text-center">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 px-3 py-1">
                    {deal.stage}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">Current Stage</p>
                </div>

                {/* Close Date */}
                <div className="md:col-span-1 text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{new Date(deal.closeDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 text-center">
                  <Button variant="ghost" size="sm" className="hover:bg-slate-100 hover:scale-110 transition-all duration-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Deal Detail Modal */}
      <Dialog open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass border-0 animate-scale-in backdrop-blur-xl">
          {selectedDeal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
                  {selectedDeal.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                {/* Left Column */}
                <div className="space-y-6 animate-slide-in-left">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Deal Value</span>
                      </div>
                      <p className="text-3xl font-bold text-green-600">
                        ${selectedDeal.value.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Win Probability</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">{selectedDeal.probability}%</span>
                          <Badge className={`${selectedDeal.probability >= 70 ? 'bg-green-100 text-green-800' : selectedDeal.probability >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedDeal.probability >= 70 ? 'High' : selectedDeal.probability >= 40 ? 'Medium' : 'Low'} Confidence
                          </Badge>
                        </div>
                        <Progress value={selectedDeal.probability} className="h-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span className="text-sm font-medium">Close Date</span>
                        </div>
                        <p className="font-bold">{new Date(selectedDeal.closeDate).toLocaleDateString()}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-slate-600" />
                          <span className="text-sm font-medium">Owner</span>
                        </div>
                        <p className="font-bold">{selectedDeal.owner}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 animate-slide-in-right">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Stage Progression</h4>
                    <div className="space-y-3">
                      {stages.map((stage, index) => (
                        <div key={stage.name} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          stage.name === selectedDeal.stage ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300' : 'bg-slate-50'
                        }`}>
                          <div className={`w-4 h-4 rounded-full ${
                            stage.name === selectedDeal.stage ? 'bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse' : 'bg-gray-300'
                          }`}></div>
                          <span className={`font-medium ${stage.name === selectedDeal.stage ? 'text-purple-700' : 'text-slate-600'}`}>
                            {stage.name}
                          </span>
                          {stage.name === selectedDeal.stage && (
                            <Badge className="bg-purple-600 text-white ml-auto">Current</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Next Actions</h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="font-medium text-blue-800">{selectedDeal.nextAction}</p>
                        <p className="text-sm text-blue-600">Scheduled for today</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="font-medium">Follow-up call</p>
                        <p className="text-sm text-gray-600">In 2 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deals;
