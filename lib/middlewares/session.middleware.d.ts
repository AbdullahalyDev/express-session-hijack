import express from "express";
export default class SessionMiddleware {
    static initMiddleware(request: express.Request): Promise<unknown>;
}
