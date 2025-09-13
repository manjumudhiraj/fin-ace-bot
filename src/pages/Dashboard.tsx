import { useState } from "react";
import { DashboardOverview } from "../components/dashboard/DashboardOverview";
import { ExpenseList } from "../components/expenses/ExpenseList";
import { BudgetTracker } from "../components/budget/BudgetTracker";
import { GoalTracker } from "../components/goals/GoalTracker";
import { AddExpenseForm } from "../components/expenses/AddExpenseForm";
import { Button } from "../components/ui/button";
import { Plus, Target, PieChart, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const Dashboard = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Header */}
      <header className="bg-gradient-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Student Budget Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                AI-powered expense management for students
              </p>
            </div>
            <Button 
              onClick={() => setShowAddExpense(true)}
              className="bg-gradient-primary hover:opacity-90 transition-smooth shadow-financial"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card shadow-card">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseList />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetTracker />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalTracker />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <AddExpenseForm onClose={() => setShowAddExpense(false)} />
      )}
    </div>
  );
};

export default Dashboard;