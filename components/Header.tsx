
import React from 'react';

interface HeaderProps {
  month: string;
  year: number;
  onExport: () => void;
  isExporting: boolean;
}

const Header: React.FC<HeaderProps> = ({ month, year, onExport, isExporting }) => {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">Money Fix Planer</p>
        <h1 className="text-3xl font-bold text-gray-900">Mein Budget</h1>
      </div>
      <button
        onClick={onExport}
        disabled={isExporting}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all text-sm font-semibold mb-1 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isExporting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Exportiere...
          </span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PDF exportieren
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
