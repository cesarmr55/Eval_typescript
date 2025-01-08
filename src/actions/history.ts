export class History {
  constructor(private history: any[]) {}

  public display(): void {
    console.log("Historique des 10 dernières opérations :");
    this.history
      .slice(-10)
      .reverse()
      .forEach((entry) => {
        console.log(
          `${entry.date.toLocaleString()} - ${entry.type} : ${entry.amount}€ (Solde : ${entry.balance}€) - ${
            entry.success ? "Réussie" : "Échouée"
          }`
        );
      });
  }
}
