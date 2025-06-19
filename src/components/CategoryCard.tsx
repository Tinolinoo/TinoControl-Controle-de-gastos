import React from 'react';
import * as Icons from 'lucide-react';
import { CategoryType, Expense } from '../types/expense';
import { getCategoryConfig } from '../utils/categories';
import { formatCurrency } from '../utils/dateUtils';

interface CategoryCardProps {
  category: CategoryType;
  expenses: Expense[];
  selectedMonth: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, expenses, selectedMonth }) => {
  const config = getCategoryConfig(category);
  const IconComponent = Icons[config.icon as keyof typeof Icons] as React.ComponentType<any>;
  
  const categoryExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
    return expense.category === category && expenseMonth === selectedMonth;
  });
  
  const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const count = categoryExpenses.length;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform cursor-pointer"
      style={{
        animation: 'fadeInUp 0.6s ease-out',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className={`p-3 rounded-lg ${config.bgColor} transition-all duration-300 hover:scale-110`}
          style={{
            animation: 'pulse 2s infinite',
          }}
        >
          <IconComponent className={`h-6 w-6 ${config.color}`} />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 transition-all duration-300 hover:scale-105">
            {formatCurrency(total)}
          </p>
          <p className="text-sm text-gray-500">{count} {count === 1 ? 'gasto' : 'gastos'}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{config.name}</h3>
        {total > 0 && (
          <div className="mt-2">
            <div className={`h-2 ${config.bgColor} rounded-full overflow-hidden`}>
              <div 
                className={`h-full bg-gradient-to-r ${config.color.replace('text-', 'from-').replace('-600', '-400')} ${config.color.replace('text-', 'to-').replace('-600', '-600')} rounded-full transition-all duration-1000 ease-out`}
                style={{ 
                  width: '100%',
                  animation: 'slideInRight 1s ease-out',
                }}
              />
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            width: 0%;
          }
          to {
            width: 100%;
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
};

export default CategoryCard;