"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const session_core_1 = __importDefault(require("../core/session.core"));
const session_error_1 = __importDefault(require("../errors/session.error"));
class SessionMiddleware {
    static initMiddleware(request) {
        return new Promise(async function (resolve, reject) {
            const data = { ...request.session };
            await session_core_1.default.regenerate(request).catch(function () {
                reject(new session_error_1.default());
            });
            await session_core_1.default.transfer(request, data).catch(function () {
                reject(new session_error_1.default());
            });
            await session_core_1.default.save(request).catch(function () {
                reject(new session_error_1.default());
            });
            await session_core_1.default.reload(request).catch(function () {
                reject(new session_error_1.default());
            });
            for (const key in data) {
                if (!(0, lodash_1.default)(request.session).has(key)) {
                    reject(new session_error_1.default());
                }
                else
                    continue;
            }
            resolve(true);
        });
    }
}
exports.default = SessionMiddleware;
