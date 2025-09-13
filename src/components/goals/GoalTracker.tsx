import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Target, Plus, Edit3, Calendar, IndianRupee, TrendingUp, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Mock goals data (converted to INR)
const mockGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    description: "Build a safety net for unexpected expenses",
    target: 83000,
    current: 37350,
    deadline: "2024-06-01",
    category: "Savings",
    priority: "high",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    name: "New Laptop",
    description: "Save for a new laptop for studies",
    target: 99600,
    current: 26560,
    deadline: "2024-08-15",
    category: "Purchase",
    priority: "medium",
    createdAt: "2024-01-05"
  },
  {
    id: 3,
    name: "Summer Trip",
    description: "Vacation fund for summer break",
    target: 66400,
    current: 14940,
    deadline: "2024-05-01",
    category: "Travel",
    priority: "low",
    createdAt: "2024-01-10"
  },
  {
    id: 4,
    name: "Textbooks Fund",
    description: "Next semester textbooks",
    target: 24900,
    current: 24900,
    deadline: "2024-08-01",
    category: "Education",
    priority: "high",
    createdAt: "2023-12-15"
  }
];

export const GoalTracker = () => {
  const [goals, setGoals] = useState(mockGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<number | null>(null);

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "expense",
      medium: "warning", 
      low: "success"
    } as const;
    return colors[priority as keyof typeof colors] || "default";
  };

  const getProgressStatus = (current: number, target: number, deadline: string) => {
    const progress = (current / target) * 100;
    const daysUntilDeadline = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (progress >= 100) return { status: "completed", color: "success", message: "Goal achieved!" };
    if (daysUntilDeadline < 0) return { status: "overdue", color: "expense", message: "Deadline passed" };
    if (daysUntilDeadline < 30 && progress < 80) return { status: "urgent", color: "warning", message: "Needs attention" };
    return { status: "on-track", color: "primary", message: "On track" };
  };

  const totalGoalValue = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const completedGoals = goals.filter(goal => goal.current >= goal.target).length;

  return (
    <div className="space-y-6">
      {/* Goals Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">Total goals</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedGoals}</div>
            <p className="text-xs text-muted-foreground">Goals achieved</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <IndianRupee className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹{totalSaved.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Amount</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalGoalValue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Total target</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Goal */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Financial Goals
            </div>
            <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input id="goal-name" placeholder="e.g., New Laptop" />
                  </div>
                  <div>
                    <Label htmlFor="goal-description">Description</Label>
                    <Input id="goal-description" placeholder="Brief description of your goal" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-target">Target Amount</Label>
                      <Input id="goal-target" type="number" placeholder="1000.00" />
                    </div>
                    <div>
                      <Label htmlFor="goal-current">Current Amount</Label>
                      <Input id="goal-current" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-deadline">Deadline</Label>
                      <Input id="goal-deadline" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="goal-priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => setIsAddingGoal(false)}>
                      Create Goal
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const { status, color, message } = getProgressStatus(goal.current, goal.target, goal.deadline);
          const daysUntilDeadline = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={goal.id} className="bg-gradient-card shadow-card transition-smooth hover:shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Target className="w-5 h-5 text-primary" />
                    )}
                    {goal.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`bg-${getPriorityColor(goal.priority)}-lighter text-${getPriorityColor(goal.priority)} border-${getPriorityColor(goal.priority)}/20`}>
                      {goal.priority}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => setEditingGoal(goal.id)}>
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-success">
                        ₹{goal.current.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        of ₹{goal.target.toLocaleString('en-IN')} target
                      </div>
                    </div>
                    <Badge 
                      variant={status === "completed" ? "default" : status === "urgent" ? "secondary" : "outline"}
                      className={`bg-${color}-lighter text-${color} border-${color}/20`}
                    >
                      {progress.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Deadline passed'}
                    </div>
                    <span className={`font-medium text-${color}`}>
                      {message}
                    </span>
                  </div>
                  
                  {status !== "completed" && (
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-sm font-medium mb-1">Monthly Progress Needed</div>
                      <div className="text-sm text-muted-foreground">
                        Save ₹{((goal.target - goal.current) / Math.max(1, Math.ceil(daysUntilDeadline / 30))).toLocaleString('en-IN')} per month to reach your goal
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Goals Insights */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Goal Progress Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-success-lighter rounded-lg border border-success/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium text-success">Congratulations!</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You've completed your Textbooks Fund goal! You're building great saving habits.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-primary-lighter rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Savings Tip</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're 45% towards your Emergency Fund goal. Consider setting up automatic transfers to reach it faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};