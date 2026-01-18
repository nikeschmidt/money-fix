
import React from 'react';
import { FinanceItem } from '../types';
import { formatCurrency } from '../utils';

interface MonthlyReportProps {
  month: string;
  year: number;
  totalIncome: number;
  incomeItems: FinanceItem[];
  totalExpenses: number;
  expenseItems: FinanceItem[];
  investAmount: number;
  remaining: number;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({
  month,
  year,
  totalIncome,
  incomeItems,
  totalExpenses,
  expenseItems,
  investAmount,
  remaining
}) => {
  return (
    <div className="w-[210mm] bg-[#f4f4f4] p-[20mm] text-gray-900 leading-relaxed mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">Money Fix Planer</p>
        <h1 className="text-4xl font-bold text-gray-900">Monatliche Finanzübersicht</h1>
        <div className="flex gap-1 mt-4">
          <div className="w-16 h-1 bg-primary-green rounded-full"></div>
          <div className="w-4 h-1 bg-[#fdef84] rounded-full"></div>
          <div className="w-4 h-1 bg-[#f7c6a9] rounded-full"></div>
        </div>
      </div>

      {/* Visual Anchor: Balance Card */}
      <div className="bg-primary-green text-white p-12 rounded-[40px] mb-12 shadow-sm relative overflow-hidden">
        <p className="text-white/80 text-base font-medium mb-2">Was mir bleibt</p>
        <h2 className="text-7xl font-bold mb-6 tracking-tight">{formatCurrency(remaining)}</h2>
        <p className="text-white/70 text-base">Geld, das am Ende des Monats übrig ist</p>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10px] left-[10%] w-32 h-32 bg-[#fdef84]/10 rounded-full blur-2xl"></div>
      </div>

      {/* Income & Spending Side-by-Side */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        {/* Income Section */}
        <div className="space-y-6 relative">
          <div className="absolute -top-1 -left-1 w-full h-1 bg-[#fdef84] opacity-50 rounded-full"></div>
          <div className="pt-2">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Einnahmen</p>
            <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(totalIncome)}</h3>
          </div>
          <div className="space-y-4 border-t border-gray-200 pt-6">
            {incomeItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-500">{item.label}</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Section */}
        <div className="space-y-6 relative">
          <div className="absolute -top-1 -left-1 w-full h-1 bg-[#f7c6a9] opacity-50 rounded-full"></div>
          <div className="pt-2">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Ausgaben</p>
            <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</h3>
          </div>
          <div className="space-y-4 border-t border-gray-200 pt-6">
            {expenseItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-500">{item.label}</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Move Section */}
      <div className="bg-beige-card p-10 rounded-[40px] mt-8 border border-[#e8dfd3] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#f7c6a9] opacity-10 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Nächster Schritt</h3>
            <p className="text-gray-500 text-base">Wie viel davon hast du investiert?</p>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-xs font-bold uppercase block mb-1">Status</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f7c6a9] text-gray-900 text-xs font-bold border border-[#e8dfd3]">Geplant</span>
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-5xl font-bold text-gray-900">{formatCurrency(investAmount)}</span>
          <span className="text-gray-400 text-lg">für Investments vorgesehen</span>
        </div>
        <p className="text-gray-400 text-sm italic">Von {formatCurrency(remaining)} verbleibend</p>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-300 text-xs tracking-widest uppercase">Money Fix • Monatliche Zusammenfassung</p>
      </div>
    </div>
  );
};

export default MonthlyReport;
