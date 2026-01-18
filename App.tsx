
import React, { useState, useMemo, useRef } from 'react';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import DetailCard from './components/DetailCard';
import AddItemModal from './components/AddItemModal';
import MonthlyReport from './components/MonthlyReport';
import { FinanceItem } from './types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { formatCurrency } from './utils';

const INITIAL_INCOME: FinanceItem[] = [
  { label: 'Gehalt', amount: 4200 },
  { label: 'Nebenprojekt', amount: 350 },
];

const INITIAL_EXPENSES: FinanceItem[] = [
  { label: 'Fixkosten', amount: 1650 },
  { label: 'Freizeit & Sonstiges', amount: 1060 },
];

const App: React.FC = () => {
  const [incomeItems, setIncomeItems] = useState<FinanceItem[]>(INITIAL_INCOME);
  const [expenseItems, setExpenseItems] = useState<FinanceItem[]>(INITIAL_EXPENSES);
  const [activeModal, setActiveModal] = useState<'income' | 'expense' | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(500);
  const [isExporting, setIsExporting] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const totalIncome = useMemo(() => incomeItems.reduce((acc, curr) => acc + curr.amount, 0), [incomeItems]);
  const totalExpenses = useMemo(() => expenseItems.reduce((acc, curr) => acc + curr.amount, 0), [expenseItems]);
  const remaining = totalIncome - totalExpenses;

  const handleAddItem = (newItem: FinanceItem) => {
    if (activeModal === 'income') {
      setIncomeItems([...incomeItems, newItem]);
    } else if (activeModal === 'expense') {
      setExpenseItems([...expenseItems, newItem]);
    }
    setActiveModal(null);
  };

  const handleUpdateIncomeAmount = (index: number, newAmount: number) => {
    const updated = [...incomeItems];
    updated[index].amount = newAmount;
    setIncomeItems(updated);
  };

  const handleUpdateExpenseAmount = (index: number, newAmount: number) => {
    const updated = [...expenseItems];
    updated[index].amount = newAmount;
    setExpenseItems(updated);
  };

  const handleDeleteIncomeItem = (index: number) => {
    setIncomeItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExpenseItem = (index: number) => {
    setExpenseItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleExport = async () => {
    if (!reportRef.current) return;
    
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#f4f4f4',
        logging: false,
        useCORS: true,
        windowWidth: 800,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`money-fix-planer-uebersicht.pdf`);
    } catch (error) {
      console.error('Export fehlgeschlagen:', error);
      alert('PDF-Export fehlgeschlagen. Bitte erneut versuchen.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-12 px-4 sm:px-6 relative">
      <div className="absolute left-[-9999px] top-0 opacity-0 pointer-events-none">
        <div ref={reportRef}>
          <MonthlyReport 
            month="Januar"
            year={2026}
            totalIncome={totalIncome}
            incomeItems={incomeItems}
            totalExpenses={totalExpenses}
            expenseItems={expenseItems}
            investAmount={investAmount}
            remaining={remaining}
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        <Header 
          month="Januar" 
          year={2026} 
          onExport={handleExport} 
          isExporting={isExporting}
        />
        
        <BalanceCard amount={remaining} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard 
            title="Einnahmen" 
            total={totalIncome} 
            items={incomeItems} 
            onAddClick={() => setActiveModal('income')}
            onUpdateAmount={handleUpdateIncomeAmount}
            onDeleteItem={handleDeleteIncomeItem}
            highlightColor="#fdef84"
          />
          <DetailCard 
            title="Ausgaben" 
            total={totalExpenses} 
            items={expenseItems} 
            onAddClick={() => setActiveModal('expense')}
            onUpdateAmount={handleUpdateExpenseAmount}
            onDeleteItem={handleDeleteExpenseItem}
            highlightColor="#f7c6a9"
          />
        </div>

        <div className="bg-beige-card p-8 rounded-[32px] mt-6 shadow-sm border border-[#e8dfd3] relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#fdef84] opacity-20 rounded-full blur-2xl"></div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nächster Schritt</h3>
          <p className="text-gray-500 text-sm mb-10">Wie viel davon möchtest du für dich arbeiten lassen?</p>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">{formatCurrency(investAmount)}</span>
            <span className="text-gray-400 text-sm">von {formatCurrency(remaining)}</span>
          </div>

          <div className="relative mb-8">
            <input
              type="range"
              min="0"
              max={remaining > 0 ? remaining : 0}
              value={investAmount}
              onChange={(e) => setInvestAmount(Number(e.target.value))}
              className="w-full h-2 bg-[#dcd5cc] rounded-lg appearance-none cursor-pointer accent-peach"
            />
          </div>

          <button className="w-full bg-[#f7c6a9] hover:bg-[#efb998] text-gray-900 font-bold py-4 px-6 rounded-2xl transition-all duration-200 mb-4 shadow-sm">
            Für Investments vormerken
          </button>
          <p className="text-center text-gray-400 text-xs">Du kannst dies später jederzeit ändern</p>
        </div>

        <AddItemModal 
          isOpen={activeModal !== null}
          onClose={() => setActiveModal(null)}
          onAdd={handleAddItem}
          title={activeModal === 'income' ? "Neue Einnahmequelle" : "Neue Ausgabe"}
        />
      </div>
    </div>
  );
};

export default App;
