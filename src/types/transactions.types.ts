export interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
}
