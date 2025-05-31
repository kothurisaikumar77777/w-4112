
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Settings, User, Command } from "lucide-react";

interface PremiumHeaderProps {
  onSidebarToggle: () => void;
}

export const PremiumHeader = ({ onSidebarToggle }: PremiumHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const notifications = [
    { id: 1, type: "urgent", count: 3 },
    { id: 2, type: "new", count: 5 }
  ];

  return (
    <header className="relative glass border-b border-white/10 p-4 animate-slide-in-down">
      <div className="flex items-center justify-between">
        {/* Enhanced Search Section */}
        <div className="flex-1 max-w-2xl relative">
          <div className={`relative transition-all duration-500 ${searchFocused ? 'scale-105 z-10' : ''}`}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search deals, contacts, companies... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="pl-12 pr-16 py-4 bg-slate-800/50 border-slate-600 focus:border-violet-400 focus:ring-violet-400/50 text-slate-100 placeholder:text-slate-400 transition-all duration-300 rounded-xl"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-700 border border-slate-600 rounded">
                  <Command className="w-3 h-3 inline mr-1" />K
                </kbd>
              </div>
            </div>
            
            {/* Search overlay */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-lg border border-slate-600 rounded-xl shadow-2xl animate-scale-in">
                <div className="p-4">
                  <div className="text-xs text-slate-400 mb-2">Quick Actions</div>
                  <div className="space-y-2">
                    {['Create New Deal', 'Add Contact', 'Schedule Meeting'].map((action) => (
                      <div key={action} className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                        <span className="text-slate-200">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Premium Actions Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Quick Stats with animations */}
          <div className="hidden md:flex items-center space-x-3">
            <Badge 
              variant="secondary" 
              className="animate-pulse-glow bg-red-500/10 text-red-400 border-red-500/30 px-3 py-1"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping"></div>
              3 Urgent
            </Badge>
            <Badge 
              variant="secondary" 
              className="animate-glow bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 py-1"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              5 Closing Today
            </Badge>
          </div>

          {/* Enhanced Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover-lift border border-slate-600"
            >
              <Bell className="w-5 h-5 text-slate-300" />
              {notifications.length > 0 && (
                <>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {notifications.reduce((acc, notif) => acc + notif.count, 0)}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-30"></div>
                </>
              )}
            </Button>
          </div>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-slate-800/50 hover:bg-slate-700 transition-all duration-300 hover-lift border border-slate-600"
            onClick={() => setShowShortcuts(!showShortcuts)}
          >
            <Settings className="w-5 h-5 text-slate-300" />
          </Button>

          {/* Enhanced Profile */}
          <div className="flex items-center space-x-3 hover-lift cursor-pointer group bg-slate-800/30 rounded-xl px-4 py-2 border border-slate-600 transition-all duration-300 hover:border-violet-400">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                A
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-800 rounded-full"></div>
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-slate-100">Alex Johnson</p>
              <p className="text-sm text-slate-400">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay */}
      {showShortcuts && (
        <div className="absolute top-full right-4 mt-2 bg-slate-800/95 backdrop-blur-lg border border-slate-600 rounded-xl shadow-2xl p-4 animate-scale-in z-50">
          <h3 className="text-slate-200 font-semibold mb-3">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-sm">
            {[
              { key: '⌘K', action: 'Quick Search' },
              { key: '⌘N', action: 'New Deal' },
              { key: '⌘⇧C', action: 'Add Contact' },
              { key: 'ESC', action: 'Close Modals' }
            ].map((shortcut) => (
              <div key={shortcut.key} className="flex justify-between items-center">
                <span className="text-slate-300">{shortcut.action}</span>
                <kbd className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-slate-400">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
