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
exports.CLI = void 0;
const prompts_1 = __importDefault(require("prompts"));
/**
 * Represents a Command Line Interface (CLI) utility.
 */
class CLI {
    constructor(choices = []) {
        this.choices = [];
        this.choices = choices;
    }
    static askValue(message_1) {
        return __awaiter(this, arguments, void 0, function* (message, type = "text") {
            const response = yield (0, prompts_1.default)({
                type,
                name: "value",
                message,
            });
            return response.value;
        });
    }
    menu() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, prompts_1.default)({
                type: "select",
                name: "action",
                message: "Que voulez-vous faire ?",
                choices: [
                    ...this.choices.map((choice) => ({
                        title: choice.title,
                        value: choice.value,
                    })),
                    { title: "Quitter", value: "quit" },
                ],
            });
            const choice = this.choices.find((choice) => choice.value === response.action);
            if (choice)
                yield choice.action();
            else
                yield this.quit();
            console.log("\n");
            this.menu();
        });
    }
    quit() {
        return __awaiter(this, void 0, void 0, function* () {
            const randomTime = Math.floor(Math.random() * 2);
            yield new Promise((resolve) => setTimeout(resolve, randomTime * 1000));
            console.log("Au revoir !");
            process.exit(0);
        });
    }
}
exports.CLI = CLI;
