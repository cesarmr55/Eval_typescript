import { CLI } from "./utils/CLI";
import { Balance, Transaction } from "./utils/types"; 

export class Withdraw {
  constructor(private balance: Balance, private history: Transaction[]) {}

  public async execute(): Promise<void> {
    const amount = await CLI.askValue("Montant à retirer (entier positif)", "number");

    if (typeof amount === "number" && amount > 0 && Number.isInteger(amount)) {
      if (amount <= this.balance.amount) {
        // Retrait valide
        this.balance.amount -= amount;
        this.history.push({
          date: new Date(),
          type: "Retrait",
          amount,
          balance: this.balance.amount,
          success: true,
        });
        console.log(`Retrait réussi. Nouveau solde : ${this.balance.amount}€`);
      } else {
        // Solde insuffisant
        console.log("Solde insuffisant.");
        this.history.push({
          date: new Date(),
          type: "Retrait",
          amount,
          balance: this.balance.amount,
          success: false,
        });
      }
    } else {
      // Montant invalide
      console.log("Montant invalide. Veuillez entrer un entier positif.");
      this.history.push({
        date: new Date(),
        type: "Retrait",
        amount: typeof amount === "number" ? amount : 0,
        balance: this.balance.amount,
        success: false,
      });
    }
  }
}
