import React from 'react';
import { TrendingUp, Calendar, Wallet } from 'lucide-react';
import { Expense, CategoryType } from '../types/expense';
import { formatCurrency, getMonthName } from '../utils/dateUtils';
import CategoryCard from './CategoryCard';

interface DashboardProps {
  expenses: Expense[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  availableMonths: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ 
  expenses, 
  selectedMonth, 
  onMonthChange, 
  availableMonths 
}) => {
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
    return expenseMonth === selectedMonth;
  });

  const totalAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalTransactions = currentMonthExpenses.length;

  // Calcular média diária
  const daysInMonth = new Date(
    parseInt(selectedMonth.split('-')[0]), 
    parseInt(selectedMonth.split('-')[1]), 
    0
  ).getDate();
  const dailyAverage = totalAmount / daysInMonth;

  const categories: CategoryType[] = ['comida', 'transporte', 'moradia', 'lazer', 'outros'];

  return (
    <div className="space-y-6">
      {/* Header com seleção de mês */}
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
        style={{
          animation: 'slideInDown 0.5s ease-out',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">Controle seus gastos mensais</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
            >
              {availableMonths.map(month => (
                <option key={month} value={month}>
                  {getMonthName(month)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            style={{
              animation: 'fadeInLeft 0.6s ease-out 0.1s both',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Gasto</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalAmount)}</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-600 transition-all duration-300 hover:scale-110" />
            </div>
          </div>

          <div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            style={{
              animation: 'fadeInLeft 0.6s ease-out 0.2s both',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Transações</p>
                <p className="text-2xl font-bold text-green-900">{totalTransactions}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 transition-all duration-300 hover:scale-110" />
            </div>
          </div>

          <div 
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            style={{
              animation: 'fadeInLeft 0.6s ease-out 0.3s both',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Média Diária</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(dailyAverage)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600 transition-all duration-300 hover:scale-110" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards de categorias */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Gastos por Categoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category}
              style={{
                animation: `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s both`,
              }}
            >
              <CategoryCard
                category={category}
                expenses={expenses}
                selectedMonth={selectedMonth}
              />
            </div>
          ))}
        </div>
      </div>
      
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
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
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
      `}</style>
    </div>
  );
};

export default Dashboard;