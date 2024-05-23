// import { UserInfo } from 'firebase/auth';
import { UserInfo } from 'firebase/auth';

// Global Types
export type GroceryList = {
  listItem: string;
  quantity: Quantity;
  description: string;
  price: number;
  priority: Priority;
  status: Status;
  author: Author; // Updated to store the user ID
};
export interface Author extends UserInfo {
  
}
type Quantity = {
  amount: string;
  metric: Metrics;
};

// ENUMS
export enum Metrics {
  'KG',
  'G',
  'L',
  'Pack',
}
export enum Status {
  'Done',
  'Pending',
  'Postponed',
}
export enum Priority {
  'Immediate',
  'Today',
  'Tomorrow',
  'This week',
  'Next week',
  'Next month',
}

// KEY ARRAYS
export const StatusArray: string[] = ['Done', 'Pending', 'Postponed'];
export const MetricsArray: string[] = ['KG', 'G', 'L', 'Pack'];
export const PriorityArray: string[] = [
  'Immediate',
  'Today',
  'Tomorrow',
  'This week',
  'Next week',
  'Next month',
];
