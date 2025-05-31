
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Search, Plus, Mail, Phone, MapPin, Calendar, Star, MessageCircle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  lastContact: string;
  status: 'hot' | 'warm' | 'cold';
  avatar: string;
  interactions: number;
  deals: number;
  value: number;
}

const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    position: 'CTO',
    location: 'San Francisco, CA',
    lastContact: '2 hours ago',
    status: 'hot',
    avatar: 'SJ',
    interactions: 23,
    deals: 3,
    value: 125000
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@startup.io',
    phone: '+1 (555) 987-6543',
    company: 'StartupXYZ',
    position: 'CEO',
    location: 'New York, NY',
    lastContact: '1 day ago',
    status: 'warm',
    avatar: 'MC',
    interactions: 15,
    deals: 2,
    value: 85000
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@enterprise.com',
    phone: '+1 (555) 456-7890',
    company: 'Enterprise Solutions',
    position: 'VP Sales',
    location: 'Austin, TX',
    lastContact: '3 days ago',
    status: 'cold',
    avatar: 'ER',
    interactions: 8,
    deals: 1,
    value: 45000
  }
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'from-red-500 to-orange-500';
      case 'warm': return 'from-yellow-500 to-amber-500';
      case 'cold': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusGlow = (status: string) => {
    switch (status) {
      case 'hot': return 'shadow-red-500/30';
      case 'warm': return 'shadow-yellow-500/30';
      case 'cold': return 'shadow-blue-500/30';
      default: return 'shadow-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between animate-slide-in-down">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Contacts
            </h1>
            <p className="text-slate-600 mt-2">Manage your customer relationships</p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
            onClick={() => {}}
          >
            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Add Contact
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowFilters(true)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:shadow-lg"
            />
          </div>
          
          {/* Filter Accordion */}
          <div className={`overflow-hidden transition-all duration-500 ease-out ${showFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Card className="p-4 glass border-0 shadow-lg">
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors duration-200">
                  Hot Leads
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-colors duration-200">
                  Warm Prospects
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200">
                  Cold Leads
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200">
                  Recent Activity
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {sampleContacts.map((contact, index) => (
            <Card
              key={contact.id}
              className={`p-6 cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl ${getStatusGlow(contact.status)} hover:shadow-2xl border-0 glass group ${
                hoveredCard === contact.id ? 'transform scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredCard(contact.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedContact(contact)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                {/* Avatar and Status */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <Avatar className={`w-16 h-16 bg-gradient-to-r ${getStatusColor(contact.status)} text-white text-lg font-bold animate-bounce-gentle transition-all duration-300 group-hover:scale-110`}>
                      {contact.avatar}
                    </Avatar>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r ${getStatusColor(contact.status)} animate-pulse-glow`}></div>
                  </div>
                  
                  <Badge className={`bg-gradient-to-r ${getStatusColor(contact.status)} text-white border-0 px-3 py-1 text-xs font-medium capitalize`}>
                    {contact.status}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-slate-600">{contact.position}</p>
                  <p className="text-sm font-medium text-slate-800">{contact.company}</p>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{contact.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{contact.interactions}</p>
                    <p className="text-xs text-slate-500">Interactions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{contact.deals}</p>
                    <p className="text-xs text-slate-500">Deals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">${(contact.value / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-slate-500">Value</p>
                  </div>
                </div>

                {/* Last Contact */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Last contact: {contact.lastContact}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <MessageCircle className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group"
            onClick={() => {}}
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Contact Detail Modal */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glass border-0 animate-scale-in">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                  {selectedContact.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                {/* Left Column - Contact Info */}
                <div className="space-y-6 animate-slide-in-left">
                  <div className="flex items-center gap-4">
                    <Avatar className={`w-20 h-20 bg-gradient-to-r ${getStatusColor(selectedContact.status)} text-white text-xl font-bold`}>
                      {selectedContact.avatar}
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                      <p className="text-slate-600">{selectedContact.position}</p>
                      <p className="font-medium">{selectedContact.company}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                      <Phone className="w-5 h-5 text-green-600" />
                      <span>{selectedContact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <span>{selectedContact.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Activity Timeline */}
                <div className="space-y-6 animate-slide-in-right">
                  <h4 className="text-lg font-semibold">Recent Activity</h4>
                  <div className="space-y-4">
                    {[
                      { action: 'Email sent', time: '2 hours ago', type: 'email' },
                      { action: 'Meeting scheduled', time: '1 day ago', type: 'meeting' },
                      { action: 'Proposal sent', time: '3 days ago', type: 'proposal' },
                      { action: 'First contact', time: '1 week ago', type: 'contact' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'email' ? 'bg-blue-500' :
                          activity.type === 'meeting' ? 'bg-green-500' :
                          activity.type === 'proposal' ? 'bg-purple-500' : 'bg-gray-500'
                        } group-hover:scale-125 transition-transform duration-200`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
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

export default Contacts;
