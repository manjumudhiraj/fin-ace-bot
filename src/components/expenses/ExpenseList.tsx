import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Filter, Calendar, DollarSign } from "lucide-react";

// Mock expense data (converted to INR)
const mockExpenses = [
  { id: 1, description: "Starbucks Coffee", amount: 411, category: "Food & Dining", date: "2024-01-15", type: "expense" },
  { id: 2, description: "Bus Pass Monthly", amount: 7055, category: "Transportation", date: "2024-01-14", type: "expense" },
  { id: 3, description: "Netflix Subscription", amount: 1327, category: "Entertainment", date: "2024-01-13", type: "subscription" },
  { id: 4, description: "Grocery Shopping", amount: 5599, category: "Food & Dining", date: "2024-01-12", type: "expense" },
  { id: 5, description: "Uber Ride", amount: 1021, category: "Transportation", date: "2024-01-11", type: "expense" },
  { id: 6, description: "Amazon Prime", amount: 746, category: "Shopping", date: "2024-01-10", type: "subscription" },
  { id: 7, description: "Pizza Delivery", amount: 1951, category: "Food & Dining", date: "2024-01-09", type: "expense" },
  { id: 8, description: "Movie Tickets", amount: 1245, category: "Entertainment", date: "2024-01-08", type: "expense" },
];

const categories = ["All", "Food & Dining", "Transportation", "Entertainment", "Shopping", "Education"];

export const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const filteredExpenses = mockExpenses
    .filter(expense => 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || expense.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "amount") return b.amount - a.amount;
      return a.description.localeCompare(b.description);
    });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Food & Dining": "warning",
      "Transportation": "primary", 
      "Entertainment": "success",
      "Shopping": "expense",
      "Education": "secondary"
    } as const;
    return colors[category as keyof typeof colors] || "default";
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Expense Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="description">Description</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
            <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredExpenses.length} expenses
            </p>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-expense">₹{totalExpenses.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="p-6 hover:bg-muted/5 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium">{expense.description}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`bg-${getCategoryColor(expense.category)}-lighter text-${getCategoryColor(expense.category)} border-${getCategoryColor(expense.category)}/20`}>
                            {expense.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString()}
                          </span>
                          {expense.type === "subscription" && (
                            <Badge variant="secondary" className="text-xs">
                              Recurring
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-expense">
                      ₹{expense.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredExpenses.length === 0 && (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="text-center py-12">
            <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No expenses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find expenses.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};