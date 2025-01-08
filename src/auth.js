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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CLI_1 = require("./actions/utils/CLI");
let storedHashedPin = null; // Variable pour stocker le hash du PIN
class Auth {
    constructor() {
        this.attempts = 0;
    }
    // Fonction pour créer un PIN
    createPin() {
        return __awaiter(this, void 0, void 0, function* () {
            const pin = yield CLI_1.CLI.askValue("Créez votre code PIN (4 chiffres)", "text");
            // Vérifier que le PIN est un nombre de 4 chiffres
            if (/^\d{4}$/.test(pin.toString())) { // Convertir en string pour tester
                storedHashedPin = bcrypt_1.default.hashSync(pin.toString(), 10); // Convertir pin en string
                console.log("Votre code PIN a été créé !");
            }
            else {
                console.log("Le code PIN doit être un nombre de 4 chiffres.");
                yield this.createPin(); // Redemander le code PIN si invalide
            }
        });
    }
    // Fonction de connexion
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!storedHashedPin) {
                console.log("Aucun code PIN trouvé. Veuillez créer un code PIN.");
                yield this.createPin(); // Demander à l'utilisateur de créer un PIN si aucun n'existe
            }
            while (this.attempts < 3) {
                const pin = yield CLI_1.CLI.askValue("Entrez votre code PIN", "text");
                // Vérifier que storedHashedPin n'est pas null avant de l'utiliser
                if (storedHashedPin === null) {
                    console.log("Erreur : Aucun code PIN stocké !");
                    return;
                }
                // Comparer le code PIN saisi avec le hash stocké
                const isValid = bcrypt_1.default.compareSync(pin.toString(), storedHashedPin); // Convertir pin en string
                if (isValid) {
                    console.log("Connexion réussie !");
                    return;
                }
                this.attempts++;
                console.log("Code PIN incorrect !");
            }
            console.log("Trop de tentatives. L'application va se fermer.");
            process.exit(1);
        });
    }
}
exports.Auth = Auth;
