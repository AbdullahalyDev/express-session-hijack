"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_middleware_1 = __importDefault(require("./middlewares/session.middleware"));
exports.default = session_middleware_1.default.initializeSessionRefresherMiddleware;
