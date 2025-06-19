import React, { useState, useEffect } from 'react';
import { PiggyBank } from 'lucide-react';
import { Expense } from './types/expense';
import { loadExpenses } from './utils/storage';
import { getCurrentMonth, getMonthsFromExpenses } from './utils/dateUtils';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses'>('dashboard');

  useEffect(() => {
    const savedExpenses = loadExpenses();
    setExpenses(savedExpenses);
  }, []);

  const handleExpenseAdded = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleExpenseDeleted = () => {
    setExpenses(loadExpenses());
  };

  const availableMonths = getMonthsFromExpenses(expenses);
  if (availableMonths.length === 0) {
    availableMonths.push(getCurrentMonth());
  }

  // Verificar se o mês selecionado ainda existe
  useEffect(() => {
    if (!availableMonths.includes(selectedMonth) && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm"
        style={{
          animation: 'slideInDown 0.5s ease-out',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 hover:scale-110"
                style={{
                  animation: 'pulse 2s infinite',
                }}
              >
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tino Control</h1>
                <p className="text-sm text-gray-500">Controle de Gastos Pessoais</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-100 text-blue-700 shadow-sm scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'expenses'
                    ? 'bg-blue-100 text-blue-700 shadow-sm scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Gastos
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        style={{
          animation: 'fadeIn 0.8s ease-out 0.2s both',
        }}
      >
        {activeTab === 'dashboard' ? (
          <Dashboard
            expenses={expenses}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            availableMonths={availableMonths}
          />
        ) : (
          <ExpenseList
            expenses={expenses}
            selectedMonth={selectedMonth}
            onExpenseDeleted={handleExpenseDeleted}
          />
        )}
      </main>

      {/* Add Expense Button */}
      <AddExpense onExpenseAdded={handleExpenseAdded} />
      
      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default App;