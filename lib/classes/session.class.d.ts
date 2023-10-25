import express from "express";
export default class SessionClass {
    static init(callback?: (request: express.Request, response: express.Response, next: express.NextFunction) => Promise<void> | void): (request: express.Request) => Promise<void>;
}
