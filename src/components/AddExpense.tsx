import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import * as Icons from 'lucide-react';
import { CategoryType, Expense } from '../types/expense';
import { categories } from '../utils/categories';
import { addExpense } from '../utils/storage';

interface AddExpenseProps {
  onExpenseAdded: (expense: Expense) => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ onExpenseAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('outros');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date,
      createdAt: Date.now()
    };

    addExpense(newExpense);
    onExpenseAdded(newExpense);
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory('outros');
    setDate(new Date().toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const formatAmountInput = (value: string) => {
    // Remove caracteres não numéricos exceto vírgula e ponto
    const numericValue = value.replace(/[^\d.,]/g, '');
    setAmount(numericValue);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-pulse"
        style={{
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <Plus className="h-6 w-6" />
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
        style={{
          animation: 'slideInUp 0.3s ease-out',
        }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Adicionar Gasto</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:rotate-90"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Almoço no restaurante"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 transform focus:scale-105"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor (R$)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => formatAmountInput(e.target.value)}
              placeholder="0,00"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 transform focus:scale-105"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(categories).map(([key, config]) => {
                const isSelected = category === key;
                const IconComponent = Icons[config.icon as keyof typeof Icons] as React.ComponentType<any>;
                
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key as CategoryType)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      isSelected
                        ? `${config.bgColor} border-current ${config.color} shadow-lg scale-105`
                        : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{config.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 transform focus:scale-105"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AddExpense;