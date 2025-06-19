import { CategoryConfig, CategoryType } from '../types/expense';

export const categories: Record<CategoryType, CategoryConfig> = {
  comida: {
    name: 'Comida',
    icon: 'UtensilsCrossed',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  transporte: {
    name: 'Transporte',
    icon: 'Car',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  moradia: {
    name: 'Moradia',
    icon: 'Home',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  lazer: {
    name: 'Lazer',
    icon: 'Gamepad2',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  outros: {
    name: 'Outros',
    icon: 'MoreHorizontal',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
};

export const getCategoryConfig = (category: CategoryType): CategoryConfig => {
  return categories[category];
};