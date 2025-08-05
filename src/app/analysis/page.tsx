
import { ExpenseAnalysisDashboard } from '@/components/expense-analysis-dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Expense Analysis',
    description: 'Analyze your spending across all events with detailed charts and insights. Understand your financial habits over time.',
};


export default function AnalysisPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <ExpenseAnalysisDashboard />
    </div>
  );
}
