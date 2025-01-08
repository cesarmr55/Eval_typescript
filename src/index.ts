import { CLI } from "./actions/utils/CLI";
import { Auth } from "./auth";
import { Deposit } from "./actions/deposit";
import { Withdraw } from "./actions/withdraw";
import { History } from "./actions/history";
import { Balance } from "./actions/balance";

const balance = { amount: 0 };
const history: any[] = [];

const deposit = new Deposit(balance, history);
const withdraw = new Withdraw(balance, history);
const viewHistory = new History(history);
const viewBalance = new Balance(balance);

async function runApp() {
  const auth = new Auth();
  await auth.login();  

  const cli = new CLI([
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

  await cli.menu();  
}


runApp().catch((error) => {
  console.error("Une erreur est survenue lors de l'exécution de l'application :", error);
});
