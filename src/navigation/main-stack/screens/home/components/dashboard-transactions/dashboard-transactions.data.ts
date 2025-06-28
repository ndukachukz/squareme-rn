import { Transaction } from "@/types/transactions.types";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    description: "Walmart Supercenter",
    amount: -87.45,
    date: "2024-01-15T18:30:00",
    status: "completed",
  },
  {
    id: "2",
    title: "Salary Deposit",
    description: "Monthly salary payment",
    amount: 3250.0,
    date: "2024-01-14T09:15:00",
    status: "completed",
  },
  {
    id: "3",
    title: "Coffee & Breakfast",
    description: "Starbucks Downtown",
    amount: -12.75,
    date: "2024-01-13T08:45:00",
    status: "completed",
  },
  {
    id: "4",
    title: "Online Transfer",
    description: "Transfer to John Doe",
    amount: -150.0,
    date: "2024-01-12T14:20:00",
    status: "pending",
  },
  {
    id: "5",
    title: "Gas Station",
    description: "Shell Station Main St",
    amount: -65.3,
    date: "2024-01-11T16:55:00",
    status: "failed",
  },
  {
    id: "6",
    title: "Freelance Payment",
    description: "Design project completion",
    amount: 450.0,
    date: "2024-01-10T11:30:00",
    status: "completed",
  },
];
