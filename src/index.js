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
const CLI_1 = require("./actions/utils/CLI");
const auth_1 = require("./auth");
const deposit_1 = require("./actions/deposit");
const withdraw_1 = require("./actions/withdraw");
const history_1 = require("./actions/history");
const balance_1 = require("./actions/balance");
const balance = { amount: 0 };
const history = [];
const deposit = new deposit_1.Deposit(balance, history);
const withdraw = new withdraw_1.Withdraw(balance, history);
const viewHistory = new history_1.History(history);
const viewBalance = new balance_1.Balance(balance);
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new auth_1.Auth();
        yield auth.login();
        const cli = new CLI_1.CLI([
            {
                title: "Déposer de l'argent",
                value: "deposit",
                action: () => deposit.execute(),
            },
            {
                title: "Retirer de l'argent",
                value: "withdraw",
                action: () => withdraw.execute(),
            },
            {
                title: "Voir l'historique",
                value: "history",
                action: () => viewHistory.display(),
            },
            {
                title: "Voir le solde",
                value: "balance",
                action: () => viewBalance.display(),
            },
        ]);
        yield cli.menu();
    });
}
runApp().catch((error) => {
    console.error("Une erreur est survenue lors de l'exécution de l'application :", error);
});
