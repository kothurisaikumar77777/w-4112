
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Calendar, 
  Settings, 
  Menu,
  ChevronLeft,
  User,
  Bell,
  Search
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Contacts", path: "/contacts" },
    { icon: DollarSign, label: "Deals", path: "/deals" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-all duration-500 ease-out z-50 ${
      isOpen ? 'w-64' : 'w-16'
    } glass-dark`}>
      
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold text-white">CRM Pro</h2>
              <p className="text-slate-400 text-xs">Sales Dashboard</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-slate-700 transition-all duration-300 hover:scale-110"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      {isOpen && (
        <div className="p-4 border-b border-slate-700 animate-slide-in-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold animate-float">
              A
            </div>
            <div>
              <p className="text-white font-medium">Alex Johnson</p>
              <p className="text-slate-400 text-xs">Sales Manager</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {isOpen && (
        <div className="p-4 border-b border-slate-700 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-slate-700 justify-start">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-slate-700 justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                  isOpen ? 'justify-start px-4 py-3' : 'justify-center px-2 py-3'
                } ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                } animate-slide-in-left`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(item.path)}
              >
                <item.icon className={`${isOpen ? 'w-5 h-5 mr-3' : 'w-5 h-5'} group-hover:scale-110 transition-transform duration-300`} />
                {isOpen && (
                  <span className="font-medium animate-fade-in-up">
                    {item.label}
                  </span>
                )}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-full animate-scale-in"></div>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-700">
        {isOpen ? (
          <div className="animate-slide-in-left">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 mb-3">
              <p className="text-white text-sm font-medium">Upgrade to Pro</p>
              <p className="text-slate-400 text-xs">Get advanced features</p>
              <Button size="sm" className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Upgrade
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <User className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
