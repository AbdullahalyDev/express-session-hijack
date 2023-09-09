"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class SessionHelpers {
    static sessionPacakgesHasBeenInstalled() {
        const validation = fs_1.default.existsSync("./package.json");
        if (!validation) {
            return false;
        }
        const file = JSON.parse(fs_1.default.readFileSync("./package.json").toString());
        return !!(file.dependencies && file.dependencies["express-session"]);
    }
}
exports.default = SessionHelpers;
