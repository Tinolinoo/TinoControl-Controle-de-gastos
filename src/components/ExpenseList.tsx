import React from 'react';
import { Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Expense } from '../types/expense';
import { getCategoryConfig } from '../utils/categories';
import { formatCurrency, formatDate } from '../utils/dateUtils';
import { deleteExpense } from '../utils/storage';

interface ExpenseListProps {
  expenses: Expense[];
  selectedMonth: string;
  onExpenseDeleted: () => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, selectedMonth, onExpenseDeleted }) => {
  const filteredExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
      return expenseMonth === selectedMonth;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este gasto?')) {
      deleteExpense(id);
      onExpenseDeleted();
    }
  };

  if (filteredExpenses.length === 0) {
    return (
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-lg"
        style={{
          animation: 'fadeIn 0.5s ease-out',
        }}
      >
        <div className="text-gray-400 mb-4">
          <Icons.FileText className="h-12 w-12 mx-auto animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum gasto encontrado</h3>
        <p className="text-gray-500">Adicione seus primeiros gastos para começar a controlar suas finanças.</p>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg"
      style={{
        animation: 'slideInUp 0.5s ease-out',
      }}
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Gastos Recentes</h2>
        <p className="text-gray-500">{filteredExpenses.length} {filteredExpenses.length === 1 ? 'transação' : 'transações'}</p>
      </div>
      <div className="divide-y divide-gray-100">
        {filteredExpenses.map((expense, index) => {
          const config = getCategoryConfig(expense.category);
          const IconComponent = Icons[config.icon as keyof typeof Icons] as React.ComponentType<any>;
          
          return (
            <div 
              key={expense.id} 
              className="p-6 hover:bg-gray-50 transition-all duration-300 group transform hover:scale-[1.02]"
              style={{
                animation: `fadeInRight 0.5s ease-out ${0.1 * index}s both`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div 
                    className={`p-2 rounded-lg ${config.bgColor} transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 transition-all duration-200 group-hover:text-blue-600">
                      {expense.description}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{config.name}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-900 transition-all duration-200 group-hover:scale-105">
                    {formatCurrency(expense.amount)}
                  </span>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ExpenseList;