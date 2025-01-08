export interface Transaction {
  date: Date;
  type: "Dépôt" | "Retrait";
  amount: number;
  balance: number;
  success: boolean;
}

export interface Balance {
  amount: number;
}
