
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  daysLeft: number;
}

const columns = [
  { id: 'leads', title: 'New Leads', count: 12, color: 'from-blue-500 to-cyan-500' },
  { id: 'qualified', title: 'Qualified', count: 8, color: 'from-purple-500 to-pink-500' },
  { id: 'proposal', title: 'Proposal', count: 5, color: 'from-orange-500 to-red-500' },
  { id: 'negotiation', title: 'Negotiation', count: 3, color: 'from-green-500 to-teal-500' },
  { id: 'closed-won', title: 'Closed Won', count: 7, color: 'from-emerald-500 to-green-600' },
  { id: 'closed-lost', title: 'Closed Lost', count: 2, color: 'from-gray-500 to-slate-600' },
];

const sampleDeals: Deal[] = [
  { id: '1', title: 'Enterprise CRM Deal', company: 'TechCorp Inc.', value: 85000, priority: 'high', assignee: 'AJ', daysLeft: 3 },
  { id: '2', title: 'Marketing Platform', company: 'StartupXYZ', value: 12000, priority: 'medium', assignee: 'SM', daysLeft: 7 },
  { id: '3', title: 'Sales Analytics Tool', company: 'DataFlow', value: 45000, priority: 'high', assignee: 'RK', daysLeft: 1 },
  { id: '4', title: 'Customer Support System', company: 'ServicePro', value: 28000, priority: 'low', assignee: 'ML', daysLeft: 14 },
];

export const KanbanBoard = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <ArrowUp className="w-4 h-4 text-red-500" />;
    if (priority === 'medium') return <ArrowUp className="w-4 h-4 text-yellow-500" />;
    return <ArrowDown className="w-4 h-4 text-green-500" />;
  };

  const getPriorityStyles = (priority: string) => {
    if (priority === 'high') return 'border-l-4 border-red-500 animate-pulse-glow';
    if (priority === 'medium') return 'border-l-4 border-yellow-500';
    return 'border-l-4 border-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sales Pipeline</h2>
        <div className="text-sm text-gray-500">
          Total Value: <span className="font-semibold text-green-600">$2.4M</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
        {columns.map((column, index) => (
          <div 
            key={column.id} 
            className="min-w-72 animate-fade-in-up" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Column Header */}
            <div className={`bg-gradient-to-r ${column.color} rounded-t-xl p-4 text-white`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {column.count}
                </Badge>
              </div>
            </div>

            {/* Column Content */}
            <div className="bg-gray-50/50 rounded-b-xl p-3 min-h-96 space-y-3">
              {index < 4 && sampleDeals.slice(0, index + 1).map((deal) => (
                <Card
                  key={deal.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover-lift hover-glow ${getPriorityStyles(deal.priority)} ${
                    hoveredCard === deal.id ? 'scale-105 shadow-2xl' : ''
                  } ${draggedCard === deal.id ? 'opacity-50 rotate-3' : ''}`}
                  onMouseEnter={() => setHoveredCard(deal.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onDragStart={() => setDraggedCard(deal.id)}
                  onDragEnd={() => setDraggedCard(null)}
                  draggable
                >
                  <div className="space-y-3">
                    {/* Deal Header */}
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 line-clamp-2">{deal.title}</h4>
                      {getPriorityIcon(deal.priority)}
                    </div>

                    {/* Company */}
                    <p className="text-sm text-gray-600">{deal.company}</p>

                    {/* Value */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        ${deal.value.toLocaleString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        deal.daysLeft <= 3 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {deal.daysLeft}d left
                      </span>
                    </div>

                    {/* Assignee */}
                    <div className="flex items-center justify-between">
                      <Avatar className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">
                        {deal.assignee}
                      </Avatar>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Add Deal Button */}
              <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-all duration-300 hover:bg-purple-50">
                + Add Deal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
