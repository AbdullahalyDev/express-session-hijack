export default class SessionError extends Error {
    constructor () {
        super();

        this.name = "SessionRegenerateError"
        this.message = "something went wrong while regenerating session";
    }
}