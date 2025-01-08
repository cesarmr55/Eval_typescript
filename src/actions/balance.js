"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
class Balance {
    constructor(balance) {
        this.balance = balance;
    }
    display() {
        console.log(`Votre solde actuel est de : ${this.balance.amount}€`);
    }
}
exports.Balance = Balance;
