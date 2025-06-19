export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: CategoryType;
  date: string;
  createdAt: number;
}

export type CategoryType = 'comida' | 'transporte' | 'moradia' | 'lazer' | 'outros';

export interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
}