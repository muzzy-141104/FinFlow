"use client";

import {
  Trash2,
  Plane,
  UtensilsCrossed,
  Home,
  ShoppingBag,
  Film,
  Ellipsis,
} from "lucide-react";
import { format } from "date-fns";
import { type Expense, type ExpenseCategory } from "@/lib/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ExpensesTableProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const categoryIcons: Record<ExpenseCategory, React.ReactNode> = {
  Travel: <Plane className="h-4 w-4" />,
  Food: <UtensilsCrossed className="h-4 w-4" />,
  Housing: <Home className="h-4 w-4" />,
  Shopping: <ShoppingBag className="h-4 w-4" />,
  Entertainment: <Film className="h-4 w-4" />,
  Other: <Ellipsis className="h-4 w-4" />,
};

export function ExpensesTable({
  expenses,
  onDeleteExpense,
}: ExpensesTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold">No Expenses Added</h3>
        <p className="text-muted-foreground mt-2">
          Click "Add Expense" to start tracking.
        </p>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {expense.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-2">
                      {categoryIcons[expense.category]}
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(expense.date), "PPP")}</TableCell>
                  <TableCell className="text-right">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteExpense(expense.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Expense</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
