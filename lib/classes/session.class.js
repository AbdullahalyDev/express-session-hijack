"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_middleware_1 = __importDefault(require("../middlewares/session.middleware"));
const session_helper_1 = __importDefault(require("../helpers/session.helper"));
class SessionClass {
    static init(callback) {
        return async function (request) {
            if (session_helper_1.default.sessionPacakgesHasBeenInstalled()) {
                session_middleware_1.default.initRegeneratorMiddleware(request)
                    .then(function () {
                    if (callback)
                        callback();
                    request.next();
                })
                    .catch(function (error) {
                    request.next(error);
                });
            }
            else {
                throw new Error("[Session Hijack] - express-session package is required");
            }
        };
    }
}
exports.default = SessionClass;
