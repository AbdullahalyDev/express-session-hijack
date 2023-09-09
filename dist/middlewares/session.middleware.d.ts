import express from "express";
export default class SessionMiddleware {
    static initAutoRegenerateMiddleware(request: express.Request): Promise<unknown>;
}
