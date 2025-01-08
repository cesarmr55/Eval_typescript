"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Withdraw = void 0;
const CLI_1 = require("./utils/CLI");
class Withdraw {
    constructor(balance, history) {
        this.balance = balance;
        this.history = history;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const amount = yield CLI_1.CLI.askValue("Montant à retirer (entier positif)", "number");
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
                }
                else {
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
            }
            else {
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
        });
    }
}
exports.Withdraw = Withdraw;
