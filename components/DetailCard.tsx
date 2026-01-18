
import React from 'react';
import { FinanceItem } from '../types';
import { formatCurrency } from '../utils';

interface DetailCardProps {
  title: string;
  total: number;
  items: FinanceItem[];
  onAddClick?: () => void;
  onUpdateAmount?: (index: number, newAmount: number) => void;
  onDeleteItem?: (index: number) => void;
  highlightColor?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ 
  title, 
  total, 
  items, 
  onAddClick, 
  onUpdateAmount, 
  onDeleteItem,
  highlightColor 
}) => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex-1 relative group overflow-hidden">
      {highlightColor && (
        <div 
          className="absolute top-0 left-0 w-full h-1.5" 
          style={{ backgroundColor: highlightColor }}
        />
      )}
      <div className="flex justify-between items-start mb-1 pt-2">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="p-1 rounded-full bg-gray-50 text-gray-400 hover:bg-primary-green hover:text-white transition-all"
            aria-label="Eintrag hinzufügen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{formatCurrency(total)}</h3>
      
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center group/item">
            <div className="flex items-center gap-2">
              {onDeleteItem && (
                <button 
                  onClick={() => onDeleteItem(idx)}
                  className="opacity-0 group-hover/item:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all"
                  aria-label="Löschen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              <span className="text-gray-500 text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={item.amount}
                onChange={(e) => onUpdateAmount?.(idx, parseFloat(e.target.value) || 0)}
                className="w-20 text-right font-semibold text-sm bg-transparent border-b border-transparent focus:border-primary-green focus:bg-gray-50 focus:outline-none transition-all rounded px-1 -mr-1"
                aria-label={`Betrag für ${item.label}`}
              />
              <span className="text-gray-400 text-[10px] font-bold">€</span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-gray-300 text-xs italic">Noch keine Einträge vorhanden</p>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
