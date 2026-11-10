import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface QuoteContextType {
  isOpen: boolean;
  selectedVertical: string;
  initialDetails: string;
  openQuoteModal: (vertical?: string, details?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState('realty-infrastructure');
  const [initialDetails, setInitialDetails] = useState('');

  const openQuoteModal = useCallback((vertical?: string, details?: string) => {
    if (vertical) {
      setSelectedVertical(vertical);
    }
    if (details) {
      setInitialDetails(details);
    } else {
      setInitialDetails('');
    }
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <QuoteContext.Provider
      value={{
        isOpen,
        selectedVertical,
        initialDetails,
        openQuoteModal,
        closeQuoteModal
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};

