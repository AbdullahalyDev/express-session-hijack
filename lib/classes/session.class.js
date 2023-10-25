"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_middleware_1 = __importDefault(require("../middlewares/session.middleware"));
class SessionClass {
    static init(callback) {
        return async function (request) {
            try {
                await session_middleware_1.default.initMiddleware(request).catch(function (error) {
                    request.next(error);
                });
                if (callback) {
                    await callback(request, request.res, request.next);
                }
                request.next();
            }
            catch (error) {
                request.next(error);
            }
        };
    }
}
exports.default = SessionClass;
