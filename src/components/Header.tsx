
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onSidebarToggle: () => void;
}

export const Header = ({ onSidebarToggle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="glass border-b border-white/20 p-4 animate-slide-in-right">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex-1 max-w-2xl">
          <div className={cn(
            "relative transition-all duration-300",
            searchFocused ? "scale-105" : ""
          )}>
            <Input
              type="text"
              placeholder="Search deals, contacts, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="pl-4 pr-12 py-3 glass-dark border-white/30 focus:border-purple-400 focus:ring-purple-400/50 text-gray-700 placeholder:text-gray-500 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-200 border border-gray-300 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge variant="secondary" className="animate-pulse-glow bg-red-100 text-red-700 border-red-200">
              3 Urgent
            </Badge>
            <Badge variant="secondary" className="animate-glow bg-green-100 text-green-700 border-green-200">
              5 Closing Today
            </Badge>
          </div>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative hover:bg-purple-100 transition-all duration-300 hover-lift"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-semibold">3</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </Button>

          {/* Profile */}
          <div className="flex items-center space-x-3 hover-lift cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform duration-300">
              A
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-gray-900">Alex Johnson</p>
              <p className="text-sm text-gray-500">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
