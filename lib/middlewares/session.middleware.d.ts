import express from "express";
export default class SessionMiddleware {
    static initRegeneratorMiddleware(request: express.Request): Promise<unknown>;
}
