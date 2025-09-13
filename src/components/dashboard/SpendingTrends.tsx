import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockTrendData = [
  { day: "Mon", amount: 45.50 },
  { day: "Tue", amount: 28.30 },
  { day: "Wed", amount: 67.80 },
  { day: "Thu", amount: 34.20 },
  { day: "Fri", amount: 89.40 },
  { day: "Sat", amount: 156.30 },
  { day: "Sun", amount: 23.10 },
];

export const SpendingTrends = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-elevated border">
          <p className="font-medium">{label}</p>
          <p className="text-expense">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};