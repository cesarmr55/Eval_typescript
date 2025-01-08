export class Balance {
  constructor(private balance: { amount: number }) {}

  public display(): void {
    console.log(`Votre solde actuel est de : ${this.balance.amount}€`);
  }
}
