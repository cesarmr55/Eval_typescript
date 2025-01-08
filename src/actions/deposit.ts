import { CLI } from "./utils/CLI";
import { Transaction, Balance } from "./utils/types";

export class Deposit {
  constructor(private balance: Balance, private history: Transaction[]) {}


  public async execute(): Promise<void> {
    const amount = await CLI.askValue("Montant à déposer (entier positif)", "number");

    
    if (typeof amount === "number" && amount > 0 && Number.isInteger(amount)) {
      this.balance.amount += amount;
      this.history.push({
        date: new Date(),
        type: "Dépôt",
        amount,
        balance: this.balance.amount,
        success: true,
      });
      console.log(`Dépôt réussi. Nouveau solde : ${this.balance.amount}€`);
    } else {
      console.log("Montant invalide. Veuillez réessayer.");
    }
  }
}
