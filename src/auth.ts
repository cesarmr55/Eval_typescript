import bcrypt from "bcrypt";
import { CLI } from "./actions/utils/CLI";

let storedHashedPin: string | null = null; // Variable pour stocker le hash du PIN

export class Auth {
  private attempts = 0;

  // Fonction pour créer un PIN
  private async createPin(): Promise<void> {
    const pin = await CLI.askValue("Créez votre code PIN (4 chiffres)", "text");

    // Vérifier que le PIN est un nombre de 4 chiffres
    if (/^\d{4}$/.test(pin.toString())) { // Convertir en string pour tester
      storedHashedPin = bcrypt.hashSync(pin.toString(), 10); // Convertir pin en string
      console.log("Votre code PIN a été créé !");
    } else {
      console.log("Le code PIN doit être un nombre de 4 chiffres.");
      await this.createPin(); // Redemander le code PIN si invalide
    }
  }

  // Fonction de connexion
  public async login(): Promise<void> {
    if (!storedHashedPin) {
      console.log("Aucun code PIN trouvé. Veuillez créer un code PIN.");
      await this.createPin(); // Demander à l'utilisateur de créer un PIN si aucun n'existe
    }

    while (this.attempts < 3) {
      const pin = await CLI.askValue("Entrez votre code PIN", "text");

      // Vérifier que storedHashedPin n'est pas null avant de l'utiliser
      if (storedHashedPin === null) {
        console.log("Erreur : Aucun code PIN stocké !");
        return;
      }

      // Comparer le code PIN saisi avec le hash stocké
      const isValid = bcrypt.compareSync(pin.toString(), storedHashedPin); // Convertir pin en string

      if (isValid) {
        console.log("Connexion réussie !");
        return;
      }

      this.attempts++;
      console.log("Code PIN incorrect !");
    }

    console.log("Trop de tentatives. L'application va se fermer.");
    process.exit(1);
  }
}
