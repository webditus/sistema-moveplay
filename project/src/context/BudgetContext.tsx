import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BudgetItem {
  id: string;
  name: string;
  price: number;
  cost?: number;
  category: string;
  selected: boolean;
  quantity?: number;
}

export interface ClientInfo {
  name: string;
  surname: string;
  whatsapp: string;
  email: string;
  eventName: string;
  cep: string;
  address: string;
  number: string;
  city: string;
  state: string;
  assemblyDate: string;
  eventDate: string;
  disassemblyDate: string;
  budgetDeadline: string;
  paymentMethod: string;
}

export interface Budget {
  id: string;
  clientInfo: ClientInfo;
  items: BudgetItem[];
  total: number;
  status: 'hot' | 'warm' | 'cold';
  stage: string;
  createdAt: Date;
  updatedAt: Date;
  notes: string[];
}

interface BudgetContextType {
  budgets: Budget[];
  currentBudget: Budget | null;
  addBudget: (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  getBudget: (id: string) => Budget | undefined;
  deleteBudget: (id: string) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);

  const addBudget = (budgetData: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const id = `MPB-${Date.now()}`;
    const newBudget: Budget = {
      ...budgetData,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setBudgets(prev => [...prev, newBudget]);
    setCurrentBudget(newBudget);
    return id;
  };

  const updateBudget = (id: string, budgetData: Partial<Budget>) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id 
        ? { ...budget, ...budgetData, updatedAt: new Date() }
        : budget
    ));
  };

  const getBudget = (id: string): Budget | undefined => {
    return budgets.find(budget => budget.id === id);
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  return (
    <BudgetContext.Provider value={{
      budgets,
      currentBudget,
      addBudget,
      updateBudget,
      getBudget,
      deleteBudget
    }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}