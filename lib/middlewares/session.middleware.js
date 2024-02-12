"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const session_core_1 = __importDefault(require("../cores/session.core"));
const session_error_1 = __importDefault(require("../errors/session.error"));
const session_helper_1 = __importDefault(require("../helpers/session.helper"));
class SessionClass {
    static initializeSessionRefresherMiddleware(callback) {
        return async function (request, response, next) {
            try {
                const data = session_helper_1.default.duplicateSessionData(request.session);
                await session_core_1.default.regenerate(request).catch(function () {
                    next(new session_error_1.default());
                });
                await session_core_1.default.transfer(request, data).catch(function () {
                    next(new session_error_1.default());
                });
                await session_core_1.default.save(request).catch(function () {
                    next(new session_error_1.default());
                });
                await session_core_1.default.reload(request).catch(function () {
                    next(new session_error_1.default());
                });
                for (const key in data) {
                    if (!(0, lodash_1.default)(request.session).has(key)) {
                        next(new session_error_1.default());
                        break;
                    }
                }
                if (callback) {
                    await callback(request, response, next);
                }
                next();
            }
            catch (error) {
                next(new session_error_1.default());
            }
        };
    }
}
exports.default = SessionClass;
