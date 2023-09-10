"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionError extends Error {
    constructor() {
        super();
        this.name = "SessionHijackRegenerateError";
        this.message = "something went wrong while regenerating session";
    }
}
exports.default = SessionError;
