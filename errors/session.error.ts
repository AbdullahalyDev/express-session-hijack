export default class SessionError extends Error {
    constructor () {
        super();

        this.name = "SessionHijackError"
        this.message = "something went wrong while regenerating session";
    }
}