import express from "express";
export default class SessionClass {
    static initializeSessionRefresherMiddleware(callback?: (request: express.Request, response: express.Response, next: express.NextFunction) => Promise<void> | void): (request: express.Request, response: express.Response, next: express.NextFunction) => Promise<void>;
}
