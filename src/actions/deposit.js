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
exports.Deposit = void 0;
const CLI_1 = require("./utils/CLI");
class Deposit {
    constructor(balance, history) {
        this.balance = balance;
        this.history = history;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const amount = yield CLI_1.CLI.askValue("Montant à déposer (entier positif)", "number");
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
            }
            else {
                console.log("Montant invalide. Veuillez réessayer.");
            }
        });
    }
}
exports.Deposit = Deposit;
