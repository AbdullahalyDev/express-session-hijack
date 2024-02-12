"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class SessionCore {
    static regenerate(request) {
        return new Promise(function (resolve, reject) {
            request.session.regenerate(function (error) {
                if (error) {
                    reject(error);
                    return;
                }
                return resolve(true);
            });
        });
    }
    static reload(request) {
        return new Promise(function (resolve, reject) {
            request.session.reload(function (error) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true);
            });
        });
    }
    static save(request) {
        return new Promise(function (resolve, reject) {
            request.session.save(function (error) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true);
            });
        });
    }
    static transfer(request, data) {
        return new Promise(function (resolve) {
            (0, lodash_1.default)(data).forOwn(function (value, key) {
                if (!(0, lodash_1.default)(request.session).has(key)) {
                    request.session[key] = value;
                }
            });
            resolve(true);
        });
    }
}
exports.default = SessionCore;
