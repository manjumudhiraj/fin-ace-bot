import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { PieChart, Edit3, Plus, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

// Mock budget data (converted to INR)
const mockBudgets = [
  { 
    id: 1, 
    category: "Food & Dining", 
    allocated: 41500, 
    spent: 35175, 
    color: "hsl(var(--warning))",
    lastUpdated: "2024-01-15"
  },
  { 
    id: 2, 
    category: "Transportation", 
    allocated: 16600, 
    spent: 12973, 
    color: "hsl(var(--primary))",
    lastUpdated: "2024-01-14"
  },
  { 
    id: 3, 
    category: "Entertainment", 
    allocated: 24900, 
    spent: 19497, 
    color: "hsl(var(--success))",
    lastUpdated: "2024-01-13"
  },
  { 
    id: 4, 
    category: "Shopping", 
    allocated: 33200, 
    spent: 35898, 
    color: "hsl(var(--expense))",
    lastUpdated: "2024-01-12"
  },
  { 
    id: 5, 
    category: "Education", 
    allocated: 24900, 
    spent: 0, 
    color: "hsl(var(--secondary))",
    lastUpdated: "2024-01-01"
  },
];

export const BudgetTracker = () => {
  const [budgets, setBudgets] = useState(mockBudgets);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState<number | null>(null);

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overallProgress = (totalSpent / totalAllocated) * 100;

  const getBudgetStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 100) return { status: "over", color: "expense" };
    if (percentage >= 80) return { status: "warning", color: "warning" };
    return { status: "good", color: "success" };
  };

  const getStatusIcon = (status: string) => {
    if (status === "over") return <AlertTriangle className="w-4 h-4" />;
    if (status === "warning") return <TrendingUp className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Budget Summary */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Budget Overview
            </div>
            <Dialog open={isAddingBudget} onOpenChange={setIsAddingBudget}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Budget Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category Name</Label>
                    <Input id="category" placeholder="e.g., Textbooks" />
                  </div>
                  <div>
                    <Label htmlFor="amount">Budget Amount</Label>
                    <Input id="amount" type="number" placeholder="300.00" />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => setIsAddingBudget(false)}>
                      Add Budget
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingBudget(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">₹{totalAllocated.toLocaleString('en-IN')}</div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-expense">₹{totalSpent.toLocaleString('en-IN')}</div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalSpent > totalAllocated ? 'text-expense' : 'text-success'}`}>
                ₹{Math.abs(totalAllocated - totalSpent).toLocaleString('en-IN')}
              </div>
              <p className="text-sm text-muted-foreground">
                {totalSpent > totalAllocated ? 'Over Budget' : 'Remaining'}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.allocated) * 100;
          const { status, color } = getBudgetStatus(budget.spent, budget.allocated);
          
          return (
            <Card key={budget.id} className="bg-gradient-card shadow-card transition-smooth hover:shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    {budget.category}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => setEditingBudget(budget.id)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-expense">
                        ₹{budget.spent.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        of ₹{budget.allocated.toLocaleString('en-IN')} allocated
                      </div>
                    </div>
                    <Badge 
                      variant={status === "over" ? "destructive" : status === "warning" ? "secondary" : "default"}
                      className={`bg-${color}-lighter text-${color} border-${color}/20`}
                    >
                      {progress.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Last updated: {new Date(budget.lastUpdated).toLocaleDateString()}
                    </span>
                    <span className={`font-medium text-${color}`}>
                      ₹{Math.abs(budget.allocated - budget.spent).toLocaleString('en-IN')} 
                      {budget.spent > budget.allocated ? ' over' : ' left'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Budget Insights */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>AI Budget Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-warning-lighter rounded-lg border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning">Budget Alert</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're spending 8% more on Shopping than usual this month. Consider reviewing recent purchases.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-success-lighter rounded-lg border border-success/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium text-success">Great Progress!</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're staying well within your Transportation budget. Keep up the good work!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-primary-lighter rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Optimization Tip</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your spending pattern, you could save ₹4,150 by meal prepping instead of dining out.
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