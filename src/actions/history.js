"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
class History {
    constructor(history) {
        this.history = history;
    }
    display() {
        console.log("Historique des 10 dernières opérations :");
        this.history
            .slice(-10)
            .reverse()
            .forEach((entry) => {
            console.log(`${entry.date.toLocaleString()} - ${entry.type} : ${entry.amount}€ (Solde : ${entry.balance}€) - ${entry.success ? "Réussie" : "Échouée"}`);
        });
    }
}
exports.History = History;
