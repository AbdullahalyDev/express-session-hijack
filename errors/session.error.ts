export default class SessionError extends Error {
    constructor () {
        super();

        this.name = "SessionHijackRegenerateError"
        this.message = "something went wrong while regenerating session";
    }
}