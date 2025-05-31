
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Check, AlertTriangle, Info } from "lucide-react";

interface NotificationProps {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  onClose: (id: number) => void;
}

export const NotificationToast = ({ id, type, title, message, onClose }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <Check className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'error': return <X className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success': return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
      case 'warning': return 'border-amber-500 bg-amber-500/10 text-amber-400';
      case 'error': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'info': return 'border-blue-500 bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <div 
      className={`
        fixed top-4 right-4 z-50 w-96 p-4 rounded-lg border glass backdrop-blur-lg
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getColors()}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-100 mb-1">{title}</h4>
          <p className="text-sm text-slate-300">{message}</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="flex-shrink-0 text-slate-400 hover:text-slate-100 h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-5000 ease-linear ${
            type === 'success' ? 'bg-emerald-500' :
            type === 'warning' ? 'bg-amber-500' :
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ 
            width: isVisible ? '0%' : '100%',
            transition: isVisible ? 'width 5000ms linear' : 'none'
          }}
        ></div>
      </div>
    </div>
  );
};

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const addNotification = (notification: Omit<NotificationProps, 'id' | 'onClose'>) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Example notifications (you can trigger these from other components)
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Deal Closed!',
        message: 'TechCorp deal worth $25,000 has been successfully closed.'
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      addNotification({
        type: 'warning',
        title: 'Follow-up Required',
        message: 'DataFlow Inc. meeting scheduled for tomorrow needs preparation.'
      });
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div>
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          {...notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};
