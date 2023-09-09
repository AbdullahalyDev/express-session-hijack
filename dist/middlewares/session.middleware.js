"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_core_1 = __importDefault(require("../core/session.core"));
const session_error_1 = __importDefault(require("../errors/session.error"));
class SessionMiddleware {
    static initAutoRegenerateMiddleware(request) {
        return new Promise(function (resolve, reject) {
            const data = request.session;
            session_core_1.default.regenerate(request)
                .then(() => {
                session_core_1.default.transfer(request, data)
                    .then(function () {
                    resolve(true);
                })
                    .catch(function () {
                    reject(new session_error_1.default());
                });
            })
                .catch(function () {
                reject(new session_error_1.default());
            });
        });
    }
}
exports.default = SessionMiddleware;
