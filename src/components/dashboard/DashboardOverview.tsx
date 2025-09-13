import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, CheckCircle, IndianRupee } from "lucide-react";
import { ExpenseChart } from "./ExpenseChart";
import { SpendingTrends } from "./SpendingTrends";

// Mock data - converted to INR (1 USD ≈ 83 INR)
const mockData = {
  totalSpent: 103543,
  monthlyBudget: 124500,
  categories: [
    { name: "Food & Dining", spent: 35175, budget: 41500, color: "hsl(var(--warning))" },
    { name: "Transportation", spent: 12973, budget: 16600, color: "hsl(var(--primary))" },
    { name: "Entertainment", spent: 19497, budget: 24900, color: "hsl(var(--success))" },
    { name: "Shopping", spent: 35898, budget: 33200, color: "hsl(var(--expense))" },
  ],
  recentExpenses: [
    { id: 1, description: "Starbucks Coffee", amount: 411, category: "Food & Dining", date: "Today" },
    { id: 2, description: "Bus Pass", amount: 2075, category: "Transportation", date: "Yesterday" },
    { id: 3, description: "Netflix Subscription", amount: 1327, category: "Entertainment", date: "2 days ago" },
  ],
  goals: [
    { name: "Emergency Fund", current: 37350, target: 83000, progress: 45 },
    { name: "Textbooks", current: 14940, target: 24900, progress: 60 },
  ]
};

export const DashboardOverview = () => {
  const budgetProgress = (mockData.totalSpent / mockData.monthlyBudget) * 100;
  const remainingBudget = mockData.monthlyBudget - mockData.totalSpent;

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card transition-smooth hover:shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <IndianRupee className="h-4 w-4 text-expense" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">₹{mockData.totalSpent.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">
              {budgetProgress > 100 ? (
                <span className="text-expense flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Over budget by ₹{(mockData.totalSpent - mockData.monthlyBudget).toLocaleString('en-IN')}
                </span>
              ) : (
                <span className="text-success flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Under budget
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card transition-smooth hover:shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockData.monthlyBudget.toLocaleString('en-IN')}</div>
            <div className="mt-2">
              <Progress value={budgetProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {budgetProgress.toFixed(1)}% used
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card transition-smooth hover:shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            {remainingBudget > 0 ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-warning" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget > 0 ? 'text-success' : 'text-expense'}`}>
              ₹{Math.abs(remainingBudget).toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-muted-foreground">
              {remainingBudget > 0 ? 'Available to spend' : 'Over budget'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card transition-smooth hover:shadow-elevated">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.goals.length}</div>
            <p className="text-xs text-muted-foreground">
              Goals in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart data={mockData.categories} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-expense">₹{expense.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.categories.map((category, index) => {
                const progress = (category.spent / category.budget) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          ₹{category.spent.toLocaleString('en-IN')} / ₹{category.budget.toLocaleString('en-IN')}
                        </span>
                        <Badge variant={progress > 90 ? "destructive" : progress > 70 ? "secondary" : "default"}>
                          {progress.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingTrends />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};