
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueTime: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Follow up with TechCorp deal', priority: 'high', completed: false, dueTime: '10:00 AM' },
  { id: '2', title: 'Send proposal to StartupXYZ', priority: 'high', completed: false, dueTime: '11:30 AM' },
  { id: '3', title: 'Call DataFlow for contract review', priority: 'medium', completed: true, dueTime: '2:00 PM' },
  { id: '4', title: 'Update CRM with meeting notes', priority: 'low', completed: false, dueTime: '3:30 PM' },
  { id: '5', title: 'Prepare demo for tomorrow', priority: 'medium', completed: false, dueTime: '4:00 PM' },
];

export const DailyActions = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;

  return (
    <Card className="p-6 glass border-0 hover-lift animate-slide-in-right h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Today's Actions</h3>
            <Badge variant="secondary" className="animate-pulse">
              {completedCount}/{tasks.length}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 animate-fade-in-up ${
                task.completed ? 'opacity-60' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1 transition-all duration-300 hover:scale-110"
              />
              
              <div className="flex-1 space-y-2">
                <p className={`text-sm font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-gray-500">{task.dueTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <Button 
          variant="outline" 
          className="w-full hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300"
        >
          + Add New Task
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{tasks.filter(t => !t.completed).length}</p>
            <p className="text-xs text-gray-500">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
