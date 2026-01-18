
export interface FinanceItem {
  label: string;
  amount: number;
}

export interface MonthlyOverview {
  month: string;
  year: number;
  income: {
    total: number;
    items: FinanceItem[];
  };
  expenses: {
    total: number;
    items: FinanceItem[];
  };
}
