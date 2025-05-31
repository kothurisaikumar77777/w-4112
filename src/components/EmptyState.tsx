
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in-up">
      <div className="mb-6">
        {icon ? (
          <div className="w-24 h-24 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full flex items-center justify-center animate-float">
            {icon}
          </div>
        ) : (
          <div className="w-24 h-24 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-full flex items-center justify-center animate-float">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg"></div>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 mb-6 max-w-md">{description}</p>
      
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 transition-all duration-300"
        >
          {action.label}
        </Button>
      )}
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-violet-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
