import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { X, DollarSign, Calendar, Tag, FileText, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface AddExpenseFormProps {
  onClose: () => void;
}

const categories = [
  "Food & Dining",
  "Transportation", 
  "Entertainment",
  "Shopping",
  "Education",
  "Healthcare",
  "Utilities",
  "Other"
];

const suggestedCategories = {
  "starbucks": "Food & Dining",
  "coffee": "Food & Dining",
  "pizza": "Food & Dining",
  "uber": "Transportation",
  "bus": "Transportation",
  "netflix": "Entertainment",
  "spotify": "Entertainment",
  "amazon": "Shopping",
  "textbook": "Education",
  "books": "Education"
};

export const AddExpenseForm = ({ onClose }: AddExpenseFormProps) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    isRecurring: false
  });
  const [suggestedCategory, setSuggestedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDescriptionChange = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
    
    // AI-like categorization based on keywords
    const lowercaseDesc = description.toLowerCase();
    let suggested = "";
    
    for (const [keyword, category] of Object.entries(suggestedCategories)) {
      if (lowercaseDesc.includes(keyword)) {
        suggested = category;
        break;
      }
    }
    
    setSuggestedCategory(suggested);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would submit to backend
    console.log("New expense:", formData);
    
    setIsSubmitting(false);
    onClose();
  };

  const applySuggestedCategory = () => {
    setFormData(prev => ({ ...prev, category: suggestedCategory }));
    setSuggestedCategory("");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Add New Expense
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Description with AI suggestion */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              required
            />
            {suggestedCategory && (
              <div className="flex items-center gap-2 p-2 bg-primary-lighter rounded-lg border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">
                  Suggested category: 
                </span>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={applySuggestedCategory}
                >
                  {suggestedCategory}
                </Badge>
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-10"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <Tag className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="date"
                type="date"
                className="pl-10"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional details..."
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Recurring checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={formData.isRecurring}
              onChange={(e) => setFormData(prev => ({ ...prev, isRecurring: e.target.checked }))}
              className="rounded border-border"
            />
            <Label htmlFor="recurring" className="text-sm">
              This is a recurring expense
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Expense"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};