"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class SessionCore {
    static regenerate(request) {
        return new Promise(function (resolve, reject) {
            try {
                request.session.regenerate(function (error) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    return resolve(true);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    static transfer(request, data) {
        return new Promise(function (resolve, reject) {
            try {
                (0, lodash_1.default)(data).forOwn(function (value, key) {
                    if (!(0, lodash_1.default)(request.session).has(key)) {
                        try {
                            request.session[key] = value;
                        }
                        catch (error) {
                            reject(error);
                        }
                    }
                });
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.default = SessionCore;
