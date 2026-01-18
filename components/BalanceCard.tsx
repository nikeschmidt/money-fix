
import React from 'react';
import { formatCurrency } from '../utils';

interface BalanceCardProps {
  amount: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ amount }) => {
  return (
    <div className="bg-primary-green text-white p-8 rounded-[32px] mb-6 shadow-sm relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-[#fdef84] opacity-10 rounded-full blur-3xl"></div>
      
      <p className="text-white/80 text-sm font-medium mb-2 relative z-10">Was mir bleibt</p>
      <h2 className="text-6xl font-bold mb-4 relative z-10">{formatCurrency(amount)}</h2>
      <p className="text-white/70 text-sm relative z-10">Geld, das am Ende des Monats übrig ist</p>
    </div>
  );
};

export default BalanceCard;