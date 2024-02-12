import express from "express";
export default class SessionCore {
    static regenerate(request: express.Request): Promise<unknown>;
    static reload(request: express.Request): Promise<unknown>;
    static save(request: express.Request): Promise<unknown>;
    static transfer(request: express.Request, data: object): Promise<unknown>;
}
